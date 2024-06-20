const knex = require('knex')(require('../../knex/knexfile').development);

const Task = {
  create: (data) => knex('tasks').insert(data),
  findAll: () => knex('tasks').select('*'),
  findById: (id) => knex('tasks').where('id', id).first(),
  update: (id, data) => knex('tasks').where('id', id).update(data),
  delete: (id) => knex('tasks').where('id', id).del()
};

module.exports = Task;