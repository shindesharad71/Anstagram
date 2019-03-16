import express from 'express';
import { login, logout, register } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

export default userRouter;
