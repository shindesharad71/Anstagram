import express from 'express';
import { login, logout, register, verify } from './userController';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/verify', verify);
userRouter.post('/logout', logout);

export default userRouter;
