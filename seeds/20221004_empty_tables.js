export async function seed(knex) {
  await knex("story").del();
}
