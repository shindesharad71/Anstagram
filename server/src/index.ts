import chalk from 'chalk';
import dotenv from "dotenv";
import { app } from './configs/app';

dotenv.config();

// Start Server
app.listen(process.env.PORT, () => {
    console.log(chalk.green(`✗ Server started at http://localhost:${process.env.PORT}`));
});
