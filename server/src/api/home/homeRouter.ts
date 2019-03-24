import express from 'express';
import { getUserFeed } from './homeController';

const homeRouter = express.Router();

homeRouter.get('/', getUserFeed);

export default homeRouter;
