import "dotenv/config";
import knex from "./src/config/knex";

beforeAll(async () => {
  global.app = require("./src/config/express").default;
  const startApolloServer = require("./src/config/apollo").default;
  await startApolloServer();
});
afterAll(async () => {
  await knex.destroy();
});
