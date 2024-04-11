// const express = require('express');
import express from 'express';
import cors from 'cors';
// const bodyParser = require('body-parser');
// import {bodyParser} from 'body-parser';
// const routes = require('./routes.ts');
import bodyParser from 'body-parser';
import routes from './routes.js';

const app = express();
const PORT = 1000;
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
  };


 app.use(cors(corsOptions));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' })); 
app.use('/', routes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
