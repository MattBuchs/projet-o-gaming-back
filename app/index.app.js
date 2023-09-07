import express from 'express';
import cors from 'cors';
import router from './routers/index.router.js';
import userDocFactory from './helpers/user.doc.js';

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());

userDocFactory(app);

app.use(router);

export default app;
