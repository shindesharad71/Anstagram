import express from 'express';
import multer from 'multer';
import { addUserFeed, getUserFeed } from './feedController';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const feedRouter = express.Router();

feedRouter.get('/:feedItemsToSkip', getUserFeed);
feedRouter.post('/', upload.array('images', 8), addUserFeed);

export default feedRouter;
