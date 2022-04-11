import { v4 as uuid } from "uuid";

export async function seed(knex) {
  await knex("story").insert({
    uuid: uuid(),
    title: "a test story",
    imageUrl: "https://picsum.photos/300",
  });
  await knex("story").insert({
    uuid: uuid(),
    title: "another story",
    imageUrl: "https://picsum.photos/1440",
  });
}
