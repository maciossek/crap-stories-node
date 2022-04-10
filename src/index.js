/* istanbul ignore file */
import "dotenv/config";
import env from "./config/env.js";
import app from "./config/express";
import consola from "consola";
import knex from "./config/postgres";

const server = app.listen(env.port, async () => {
  consola.info(`🚀 Server listening on port http://localhost:${env.port}`);
});

process.on("SIGTERM", shutdown("SIGTERM")).on("SIGINT", shutdown("SIGINT")).on("uncaughtException", shutdown("uncaughtException"));

function shutdown(signal) {
  return (err) => {
    consola.info(`${signal} signal received. Going to close the server...`);

    server.close(() => {
      consola.info("Http server closed successfully.");
    });
    knex.destroy();

    if (err) {
      consola.error(err.stack || err);
    }
    setTimeout(() => {
      consola.info("...waited 5s, exiting.");
      process.exit(err ? 1 : 0);
    }, 5000).unref();
  };
}

export default server;
