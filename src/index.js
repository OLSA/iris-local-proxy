import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { createHttpTerminator } from 'http-terminator';
import chalk from 'chalk';

const init = () => {
  const error = chalk.white;
  const warning = chalk.hex('#FFA500');
  const info = chalk.greenBright;

  const proxy = express();

  proxy.use(
    cors({
      credentials: false,
      origin: "*"
    })
  );
  proxy.options('*', cors({ credentials: false, origin: "*" }));

  const _time = () => {
    const date = new Date();
    return date.toLocaleTimeString('eu') + ":" + date.getMilliseconds();
  };

  proxy.use('/proxy', async function (req, res) {
    const url = req.url.substring(1);
    if (!isUrl(url)) {
      return res.status(400).send('Invalid URL');
    }

    try {
      console.log(_time() + " " + info(url));
      const response = await fetch(url);
      const data = await response.text();
      res.set(response.headers).status(response.status).send(data);
    } catch (error) {
      console.error('\nRequest error: ' + url + '\n', error);
      res.status(500).send('Internal Server Error');
    }
  });

  const server = proxy.listen(8010);
  console.log('\n' + chalk.blueBright('Proxy server listening on PORT 8010'));
  console.log(chalk.blueBright(`Process pid ${process.pid}`) + '\n');

  // gasenje servera
  const httpTerminator = createHttpTerminator({
    server
  });

  process.on('SIGINT', async () => {
    console.log('\n' + info('Server close...'));
    await httpTerminator.terminate();
    process.exit(0);
  });

  process.on('uncaughtException', error => {
    console.error('Uncaught Exception:', error);
  });

  process.on('unhandledRejection', error => {
    console.error('Unhandled Rejection:', error);
  });
};

const isUrl = string => {
  try { return Boolean(new URL(string)); }
  catch (e) { return false; }
}

export default init;
