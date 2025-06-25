import express from 'express';
import Expense from '../models/Expense.js';
import { authenticate } from '../middleware/auth.js'; // ✅ RIGHT
import Group from '../models/Group.js';

const router = express.Router();

// ✅ Get all expenses for logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get balance summary for current user
router.get('/summary', authenticate, async (req, res) => {
  try {
    const groups = await Group.find({ user: req.userId });

    const result = [];

    for (const group of groups) {
      const expenses = await Expense.find({ group: group._id });

      const balances = {};

      expenses.forEach(exp => {
        const share = exp.amount / exp.participants.length;
        exp.participants.forEach(participant => {
          if (participant === exp.payer) return;
          const key = `${participant}->${exp.payer}`;
          balances[key] = (balances[key] || 0) + share;
        });
      });

      const summaryList = Object.entries(balances).map(([key, amt]) => {
        const [debtor, creditor] = key.split('->');
        return `${debtor} owes ${creditor} ₹${amt.toFixed(2)}`;
      });

      result.push({
        groupName: group.name,
        summary: summaryList
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ Add a new expense for logged-in user
router.post('/add', authenticate, async (req, res) => {
  try {
    const newExpense = new Expense({
      ...req.body,
      user: req.userId, // ⬅️ Save user
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Fetch single expense (optional auth)
router.get('/:id', authenticate, async (req, res) => {
  const exp = await Expense.findOne({ _id: req.params.id, user: req.userId });
  if (!exp) return res.status(404).json({ message: 'Expense not found' });
  res.json(exp);
});

// ✅ Update expense
router.put('/:id', authenticate, async (req, res) => {
  const updated = await Expense.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

// ✅ Delete expense
router.delete('/:id', authenticate, async (req, res) => {
  await Expense.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json({ message: 'Deleted' });
});

export default router;
