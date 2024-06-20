const knex = require("knex")(require("../../knex/knexfile").development);

const Log = {
  create: (data) => knex("logs").insert(data),
  findAll: () => knex("logs").select("*"),
};

module.exports = Log;
