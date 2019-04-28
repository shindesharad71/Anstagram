import express from 'express';
import { getProfileTabInfo, getUserProfile } from './profileController';

const profileRouter = express.Router();

profileRouter.get('/:username', getUserProfile);
profileRouter.get('/:username/:tabType', getProfileTabInfo);

export default profileRouter;
