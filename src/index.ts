import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import User from './models/user';

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
app.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        throw error;
    }
});

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});
