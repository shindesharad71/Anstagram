import express from 'express';
import { getUserProfile } from './profileController';

const profileRouter = express.Router();

profileRouter.get('/:username', getUserProfile);

export default profileRouter;
