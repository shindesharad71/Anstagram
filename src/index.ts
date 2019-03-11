import bodyParser from 'body-parser';
import chalk from "chalk";
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import User from './models/user';
import { Routes } from './routes';

// Init dotenv config
dotenv.config();

const app = express();

// Connect to MongoDB.
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.connect(`${process.env.MONGO_URL}${process.env.MONGO_DB_NAME}`);
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
    next();
});

// Routes
Routes.forEach((route) => app.use(route.path, route.router));

app.use('*', (req, res, next) => {
    const message = `Cannot ${req.method} ${req.url}`;
    res.status(404).json({ error: message });
    next();
});

// Start Server
app.listen(process.env.PORT, () => {
    console.log(chalk.green(`✗ Server started at http://localhost:${process.env.PORT}`));
});
