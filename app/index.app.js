import express from 'express';
import cors from 'cors';
import router from './routers/index.router.js';
import userDocFactory from './helpers/user.doc.js';

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

userDocFactory(app);

app.use(router);

export default app;
