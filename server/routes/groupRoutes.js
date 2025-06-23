import express from 'express';
import Group from '../models/Group.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  const group = new Group(req.body);
  await group.save();
  res.status(201).json(group);
});

router.get('/', async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
});

export default router;
