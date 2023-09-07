import express from 'express';
import cors from 'cors';
import router from './routers/index.router.js';
import userDocFactory from './helpers/user.doc.js';

const app = express();

app.use(cors());

app.use(express.json());

userDocFactory(app);

app.use(router);

export default app;
