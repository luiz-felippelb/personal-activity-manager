const swaggerAutogen = require('swagger-autogen')();
const doc = require('./config/swagger.js');

const outputFile = './src/swagger.json';
const endpoints = ['./index.js'];

swaggerAutogen(outputFile, endpoints, doc)