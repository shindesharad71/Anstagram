import express from 'express';
import { getUserFeed } from './feedController';

const feedRouter = express.Router();

feedRouter.get('/', getUserFeed);

export default feedRouter;
