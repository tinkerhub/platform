import { server } from './server/https';

const start = async () => {
  try {
    await server.after();
    await server.listen(server.config.PORT, server.config.HOST);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
