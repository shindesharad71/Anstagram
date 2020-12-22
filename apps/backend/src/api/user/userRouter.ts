import * as express from 'express';
import multer from 'multer';
import {
	addFile,
	checkUsername,
	deleteFile,
	login,
	logout,
	register,
	verify
} from './userController';

const storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, `${__dirname}/assets/uploads`);
	},
	filename: (req, file, cb) => {
		let filename = `${Date.now()}_${file.originalname}`;
		filename = filename.split(' ').join('-');
		cb(null, filename);
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
