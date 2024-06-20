exports.up = function(knex) {
    return knex.schema.createTable('tasks', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.timestamp('date').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
  };