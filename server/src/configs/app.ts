import bodyParser from 'body-parser';
import chalk from "chalk";
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { Routes } from '../api';
import { requestValidator } from './jwt';

// Init dotenv config
dotenv.config();

const app = express();

// Connect to MongoDB.
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);

// tslint:disable-next-line: max-line-length
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}${process.env.MONGO_DB_NAME}`, {
    useNewUrlParser: true
});

mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log("%s MongoDB connection error. Please make sure MongoDB is running.", chalk.red("✗"));
    process.exit();
});

// Middleware Initialization
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use('/public', express.static('uploads'));

// Request, Response Entry Point
app.use((req, res, next) => {
    console.log(chalk.yellow(`${req.method} - ${req.url}`));
    if (requestValidator(req)) {
        next();
    } else {
        res.status(400).json({
            message: 'invalid auth token, or token is not supplied'
        });
    }
});

// Routes
Routes.forEach((route) => app.use(route.path, route.router));

export { app };
