/* eslint-disable no-console, max-len */

const app = require('./');
const chalk = require('chalk');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`${chalk.green('Server started')}`);

  console.log(
    `${chalk.blue(`Currently listening on http://localhost:${chalk.bold(port)}`)}`
  );
});
