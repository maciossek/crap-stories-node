import knex from "./config/knex";

export default class PostgresDataSource {
  knex;

  constructor() {
    this.knex = knex;
  }
}
