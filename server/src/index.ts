import chalk from 'chalk';
import { app } from './configs/app';

// Start Server
app.listen(8080, '0.0.0.0', () => {
    console.log(chalk.green(`✗ Server started at http://0.0.0.0:8080`));
});
