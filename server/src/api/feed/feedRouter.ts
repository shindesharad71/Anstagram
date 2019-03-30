import express from 'express';
import multer from 'multer';
import { addUserFeed, getUserFeed } from './feedController';

const upload = multer({ storage: multer.memoryStorage() });

const feedRouter = express.Router();

feedRouter.get('/', getUserFeed);
feedRouter.post('/', upload.single('images'), addUserFeed);

export default feedRouter;
