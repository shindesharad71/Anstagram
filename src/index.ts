import chalk from "chalk";
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

// Routes
Routes.forEach((route) => app.use(route.path, route.router));

app.use('*', (req: Request, res: any, next: any) => {
    const message = `Cannot ${req.method} ${req.url}`;
    res.sendStatus(404).json({ error: message });
    next();
});

// app.get("/", async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.json(users);
//     } catch (error) {
//         throw error;
//     }
// });

// Start Server
app.listen(process.env.PORT, () => {
    console.log(chalk.green(`✗ Server started at http://localhost:${process.env.PORT}`));
});
