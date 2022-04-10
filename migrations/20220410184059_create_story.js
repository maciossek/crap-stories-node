export async function up(knex) {
  await knex.schema.createTable("story", (table) => {
    table.bigIncrements("id").primary();
    table.uuid("uuid").index().notNullable();
    table.string("title").notNullable();
    table.string("imageUrl").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("story");
}
