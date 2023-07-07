// v.1.0.1 dodata obrada greske kako ne bi dolazilo do prekida rada proxy-ja
import express from 'express';
import request from 'request';
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

  proxy.use('/proxy', function(req, res) {
    let url = req.url.substring(1);

    try {
      console.log(_time() + " " + info(url));
    } catch (e) {
      console.log(error(e));
    }

    req.pipe(

      request(url)
    .on('error', error => {
      console.error('\nRequest error: ' + url + '\n');
	  //console.error('Request error: ', url, '\n', error);
      res.status(500).send('Internal Server Error');
    })
    .on('response', response => {
      const accessControlAllowOriginHeader =
        response.headers['access-control-allow-origin'];
      if (accessControlAllowOriginHeader && accessControlAllowOriginHeader !== "*") {
        response.headers['access-control-allow-origin'] = "*";
      }
    })

    ).pipe(res);
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

  let _time = () => {
    const date = new Date();
    return date.toLocaleTimeString('eu') + ":" + date.getMilliseconds();
  };
};

const isUrl = string => {
    try { return Boolean(new URL(string)); }
    catch(e){ return false; }
}

export default init;
