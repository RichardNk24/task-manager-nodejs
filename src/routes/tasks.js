const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Task = require('../models/task');
const Log = require('../models/log');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/tasks', [
  body('title').isString().notEmpty(),
  body('description').isString().optional(),
  body('date').isISO8601().toDate().optional()
], authenticateToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  const date = req.body.date || new Date();
  await Task.create({ title, description, date });
  await Log.create({ user: req.user.username, action: 'POST' });
  res.status(201).send(`Bravo! La tâche a été créée avec succès`);
});

router.get('/tasks', authenticateToken, async (req, res) => {
  const tasks = await Task.findAll();
  await Log.create({ user: req.user.username, action: 'GET' });
  res.json(tasks);
});

router.get('/tasks/:id', authenticateToken, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).send(`La tâche n'a pas été trouvée`);
  }
  await Log.create({ user: req.user.username, action: 'GET' });
  res.json(task);
});

router.put('/tasks/:id', [
  body('title').isString().notEmpty(),
  body('description').isString().optional(),
  body('date').isISO8601().toDate().optional()
], authenticateToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, date } = req.body;
  const task = await Task.update(req.params.id, { title, description, date });
  if (!task) {
    return res.status(404).send(`La tâche n'a pas été trouvée`);
  }
  await Log.create({ user: req.user.username, action: 'PUT' });
  res.status(200).send(`Tâche mise à jour`);
});

router.patch('/tasks/:id', [
  body('title').optional().isString().notEmpty(),
  body('description').optional().isString(),
  body('date').optional().isISO8601().toDate()
], authenticateToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updates = req.body;
  const task = await Task.update(req.params.id, updates);
  if (!task) {
    return res.status(404).send(`La tâche n'a pas été trouvée`);
  }
  await Log.create({ user: req.user.username, action: 'PATCH' });
  res.status(200).send(`La tâche a bien été modifiée`);
});

router.delete('/tasks/:id', authenticateToken, async (req, res) => {
  const task = await Task.delete(req.params.id);
  if (!task) {
    return res.status(404).send(`La tâche n'a pas été trouvée`);
  }
  await Log.create({ user: req.user.username, action: 'DELETE' });
  res.status(200).send(`La tâche a bien été supprimée`);
});

module.exports = router;