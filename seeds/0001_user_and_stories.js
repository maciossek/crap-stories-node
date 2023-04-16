import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const tableName = "user";

export async function seed(knex) {
  const user1 = await knex(tableName)
    .insert({
      uuid: uuid(),
      email: "hans@crapstories.wat",
      password: bcrypt.hashSync("test", 10),
    })
    .returning("id");

  const user2 = await knex(tableName)
    .insert({
      uuid: uuid(),
      email: "bernd@crapstories.wat",
      password: bcrypt.hashSync("test", 10),
    })
    .returning("id");

  await knex("story").insert({
    uuid: uuid(),
    title: "a test story",
    imageUrl: "https://picsum.photos/300",
    userId: user1[0].id,
  });
  await knex("story").insert({
    uuid: uuid(),
    title: "another story",
    imageUrl: "https://picsum.photos/1440",
    userId: user2[0].id,
  });
}
