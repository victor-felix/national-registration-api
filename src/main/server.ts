import sourceMapSupport from 'source-map-support';
import setupApp from './app';
import config from './config';

const hostname = config.SERVERS.http.hostname;
const port = config.SERVERS.http.port;
sourceMapSupport.install();

(async (): Promise<void> => {
  const app = await setupApp();
  app.listen(port, hostname, () =>
    console.log(`Worker ${process.pid} running server ${hostname}:${port}`),
  );
})();
