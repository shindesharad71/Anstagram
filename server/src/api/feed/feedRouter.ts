import express from 'express';
import multer from 'multer';
import { addUserFeed, getUserFeed } from './feedController';

const upload = multer({ dest: 'uploads/' });

const feedRouter = express.Router();

feedRouter.get('/', getUserFeed);
feedRouter.post('/', upload.array('images', 12), addUserFeed);

export default feedRouter;
