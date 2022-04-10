export async function seed(knex) {
  await knex("story").insert({
    title: "a test story",
    imageUrl: "https://picsum.photos/300",
  });
  await knex("story").insert({
    title: "another story",
    imageUrl: "https://picsum.photos/1440",
  });
}
