import commentRouter from './comment/commentRouter';
import feedRouter from './feed/feedRouter';
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
    }
];

export { Routes };
