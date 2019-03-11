import express from 'express';

const userRouter = express.Router();

userRouter.get('/logout', (req, res) => {
    res.json({ message: 'logout test' });
});

export default userRouter;
