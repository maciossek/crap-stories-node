export async function up(knex) {
  await knex.schema.createTable("user", (table) => {
    table.bigIncrements("id").primary();
    table.uuid("uuid").index().notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user");
}
