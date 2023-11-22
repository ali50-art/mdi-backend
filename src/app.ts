import express, { Express } from 'express';
import cookieSession from 'cookie-session';
import path from 'path';
import cors from 'cors';
import './utils/passport'
import passport from 'passport';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import xss from 'xss-clean';
import errors from './middlewares/errors';
import cookieParser from 'cookie-parser';
import notFound from './middlewares/notFound';
import mongoSanitize from 'express-mongo-sanitize';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './docs/config';
import routes from './routes';
import googleAuth from './routes/v1/googleAuth'
import orderService from './services/v1/order.service'
const stripe = require('stripe')('sk_test_51JEbHXEgJ1bLHwbDKY6j83aCHtW304qVFfICMi7zBvo0fUYmlVGI0W0E79dNFGcvFb7B8fIQx3mGOfM5A9zJ1Zfe00jH8Z46Ls')

// Config Env Path
dotenv.config();

// Create App
const app: Express = express();

// cors options
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: "GET,POST,PUT,DELETE",
  optionsSuccessStatus: 200,
  credentials: true,
};


app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(xss());
app.use(hpp());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes Config
app.post('/create-checkout-session', async (req, res) => {
	const customer=await stripe.customers.create({
		metadata:{
			userId:req.body.userId,
			offer:req.body.data.name,
			offerId:req.body.data._id,
			nbHoures:req.body.data.nbHoures
		}
	})
	
	
	const session = await stripe.checkout.sessions.create({
	  line_items: [
		{
		  price_data: {
			currency: 'EUR',
			product_data: {
			  name: req.body.data.name,
			},
			unit_amount: req.body.data.price * 100,
		  },
		  quantity: 1,
		},
	  ],
	  customer:customer.id,
	  mode: 'payment',
	  success_url: `${process.env.CLIENT_URL}/checkout-success`,
	  cancel_url:  `${process.env.CLIENT_URL}/offer-manuel`
	});
  

	console.log('session.url : ',session.url);
	
	res.send({
		url:session.url
	});
  });


// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret :string
// endpointSecret= "whsec_0be7e283d8e3a18ab9714f2f78abf7ece93cd182f46043c3d93d635dcb9c3a56";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
  let data:any;
  let eventType
	if(endpointSecret){
		let event;
	  
		try {
			console.log('hello');
			
		  event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
		  console.log('verifed success !');
		  
		} catch (err) {
		  response.status(400).send(`Webhook Error: ${err.message}`);
		  return;
		}

		data=event.data.object;
		eventType=event.type
	}else{
		
		data=request.body.data.object;
		eventType=request.body.type;
	}

  // Handle the event
  if(eventType=='checkout.session.completed'){
	stripe.customers.retrieve(data.customer).then(async (customer:any)=>{
		const newOrder:any={
			offerId:customer.metadata.offerId,
			studentId:customer.metadata.userId,
			nbHoures:customer.metadata.nbHoures
		}
		await orderService.create(newOrder)
		
	}).catch((err:any)=>console.log(err.message))
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});


app.use('/api', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/auth',googleAuth)

// Error Middleware
app.use(notFound);
app.use(errors);

export default app;
