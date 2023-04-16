export async function seed(knex) {
  await knex("user").del();
  await knex("story").del();
}
