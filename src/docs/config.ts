import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'API Documentation',
    description: 'This is the API documentation',
    version: '1.0.0',
    contact: {
      name: 'Mohamed Tarek GuezGuez',
      email: 'mohamedtarekguezguez@takiacademyteam.com',
      url: 'https://www.guezguez.tk/',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/docs/**/*.yaml'],
};

export default swaggerJSDoc(options);
