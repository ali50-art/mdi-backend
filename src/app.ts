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

app.use('/api', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/auth',googleAuth)

// Error Middleware
app.use(notFound);
app.use(errors);

export default app;
