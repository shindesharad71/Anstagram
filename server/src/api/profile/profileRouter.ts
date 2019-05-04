import express from 'express';
import { getProfileTabInfo, getUserProfile, updateProfilePic } from './profileController';

const profileRouter = express.Router();

profileRouter.get('/:username', getUserProfile);
profileRouter.get('/:username/:tabType', getProfileTabInfo);
profileRouter.post('/change-profile-pic', updateProfilePic);

export default profileRouter;
