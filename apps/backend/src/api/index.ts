import commentRouter from './comment/commentRouter';
import feedRouter from './feed/feedRouter';
import profileRouter from './profile/profileRouter';
import userRouter from './user/userRouter';

const Routes = [
    {
        path: '/users',
        router: userRouter
    },
    {
        path: '/feed',
        router: feedRouter
    },
    {
        path: '/comments',
        router: commentRouter
    },
    {
        path: '/profile',
        router: profileRouter
    }
];

export { Routes };
