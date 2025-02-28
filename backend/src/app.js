import express from 'express';
import cors from 'cors';
import apiRoutes from './routers/index.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

let allowedOrigin;
if (process.env.NODE_ENV === 'production') {
  allowedOrigin = 'ec2-44-203-195-78.compute-1.amazonaws.com';
} else {
  allowedOrigin = 'http://localhost:8080';
}

const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET, PUT, POST, DELETE',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', apiRoutes);

export default app;
