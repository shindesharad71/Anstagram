import * as express from 'express';
import multer from 'multer';
import { addFile, checkUsername, deleteFile, login, logout, register, verify } from './userController';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/verify', verify);
userRouter.get('/check/:username', checkUsername);
userRouter.post('/upload', upload.single('filepond'), addFile);
userRouter.delete('/upload', deleteFile);
userRouter.post('/logout', logout);

export default userRouter;
