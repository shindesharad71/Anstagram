import dotenv from "dotenv";
import express from "express";

// Init dotenv config
dotenv.config();

const app = express();

// Routes
app.get("/", (req, res) => {
    res.json("Hello world!");
});

// Start Server
app.listen(process.env.PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});
