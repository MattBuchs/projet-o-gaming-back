import './app/helpers/env.load.js';
import { createServer } from 'node:http';
import cors from 'cors';
import logger from './app/helpers/logger.js';
import app from './app/index.app.js';

app.use(cors());

const server = createServer(app);

const PORT = process.env.PORT ?? 3000;

server.listen(PORT, () => {
    logger.info(`Server launched on http://localhost:${PORT}`);
});
