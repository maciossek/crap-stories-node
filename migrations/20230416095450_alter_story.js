const tableName = "story";

export async function up(knex) {
  await knex.schema.table(tableName, (table) => {
    table.bigInteger("userId").references("id").inTable("user").onDelete("CASCADE").notNullable();
  });
}

export async function down(knex) {
  await knex.schema.table(tableName, (table) => {
    table.dropColumn("userId");
  });
}
