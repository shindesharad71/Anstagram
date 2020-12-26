import * as bodyParser from 'body-parser';
import * as chalk from 'chalk';
import cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import jwt from 'express-jwt';
import * as mongoose from 'mongoose';
import { Routes } from '../api';
import { JWT_CONFIG, requestValidator } from './jwt';

// Init dotenv config
dotenv.config();

const app = express();

mongoose.connect(`${process.env.MONGO_URL}${process.env.MONGO_DB_NAME}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});

mongoose.connection.on('error', err => {
	console.error(err);
	console.error(
		'%s MongoDB connection error. Please make sure MongoDB is running.',
		chalk.red('✗')
	);
	process.exit();
});

// Middleware Initialization
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: true,
		parameterLimit: 50000
	})
);

app.use('/assets', express.static(__dirname + '/assets'));

// Set Express JWT
app.use(
	jwt({ secret: JWT_CONFIG.JWT_SECRET }).unless({
		path: JWT_CONFIG.noAuthUrls
	})
);

// Request, Response Entry Point
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err.name === 'UnauthorizedError') {
		return res.status(403).json({
			error: 'UnauthorizedError',
			message: 'No token provided.'
		});
	}

	if (requestValidator(req)) {
		next();
	} else {
		return res.status(403).json({
			error: 'InvalidToken',
			message: 'token invalid.'
		});
	}
});

// Routes
Routes.forEach(route => app.use(route.path, route.router));

export default app;
