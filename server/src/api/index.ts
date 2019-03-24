import homeRouter from './home/homeRouter';
import userRouter from './user/userRouter';

const Routes = [
    {
        path: '/users',
        router: userRouter
    },
    {
        path: '/home',
        router: homeRouter
    }
];

export { Routes };
