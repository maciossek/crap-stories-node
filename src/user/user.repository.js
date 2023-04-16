import PostgresDataSource from "../postgres.datasource";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const userColumns = ["id", "uuid", "email", "password", "created_at", "updated_at"];

export default class UserRepository extends PostgresDataSource {
  tableName = "user";

  static async checkPassword(givenPassword, userPassword) {
    return await bcrypt.compare(givenPassword, userPassword);
  }

  async getUser(email) {
    const user = await this.knex(this.tableName).select(userColumns).where({ email }).first();

    return user;
  }

  async createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.knex(this.tableName).insert({ uuid: uuid(), email, password: hashedPassword }).returning(userColumns);
  }
}
