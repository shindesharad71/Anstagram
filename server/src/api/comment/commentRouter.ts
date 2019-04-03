import express from 'express';
import { addFeedComments, getFeedComments } from './commentController';

const commentRouter = express.Router();

commentRouter.get('/', getFeedComments);
commentRouter.post('/', addFeedComments);

export default commentRouter;
