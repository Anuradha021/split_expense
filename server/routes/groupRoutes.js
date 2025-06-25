import express from 'express';
import Group from '../models/Group.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// ✅ Create a new group (only for logged-in users)
router.post('/create', authenticate, async (req, res) => {
  try {
    const group = new Group({
      name: req.body.name,
      members: req.body.members,
      user: req.userId, // Link group to logged-in user
    });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all groups created by the logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const groups = await Group.find({ user: req.userId });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).json({ message: 'Group not found' });
  res.json(group); // includes .members
});

export default router;
