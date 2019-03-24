import express from 'express';
import { addUserFeed, getUserFeed } from './feedController';

const feedRouter = express.Router();

feedRouter.get('/', getUserFeed);
feedRouter.post('/', addUserFeed);

export default feedRouter;
