import * as express from 'express';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import {
	addFile,
	checkUsername,
	deleteFile,
	login,
	logout,
	register,
	verify
} from './userController';

const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

// Grid FS Storage
const storage = new GridFsStorage({
	url: mongoURI,
	options: { useUnifiedTopology: true },
	file: (req, file) => {
		return new Promise(resolve => {
			let filename = `${Date.now()}-${file.originalname}`;
			filename = filename.split(' ').join('-');
			const fileInfo = {
				filename
			};
			resolve(fileInfo);
		});
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
