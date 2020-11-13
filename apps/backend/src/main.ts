import * as chalk from 'chalk';
import app from './configs/app';

// Start Server
app.listen(5000, '0.0.0.0', () => {
	console.info(chalk.green(`✗ Server started at http://0.0.0.0:5000`));
});
