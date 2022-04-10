import config from "./env";
import Knex from "knex";
const isProd = config.env === "production";

export const knexConf = {
  client: "pg",
  connection: config.dbHost,
  ssl: isProd ? true : false,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

const db = Knex(knexConf);

export default db;
