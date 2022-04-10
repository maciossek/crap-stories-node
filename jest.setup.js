import "dotenv/config";
import knex from "./src/config/knex";

beforeAll(() => {
  global.app = require("./src/config/express").default;
});
afterAll(async () => {
  knex.destroy();
});
