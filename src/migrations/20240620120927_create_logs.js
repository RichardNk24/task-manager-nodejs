exports.up = function(knex) {
    return knex.schema.createTable('logs', table => {
      table.increments('id').primary();
      table.timestamp('timestamp').defaultTo(knex.fn.now());
      table.string('user').notNullable();
      table.string('action').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('logs');
  };