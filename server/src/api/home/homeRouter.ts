import express from 'express';
import { getFeed } from './homeController';

const homeRouter = express.Router();

homeRouter.get('/', getFeed);

export default homeRouter;
