import express from 'express';
import Expense from '../models/Expense.js';

const router = express.Router();

// ✅ Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get balance summary (who owes whom)
router.get('/summary', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const balances = {};

    expenses.forEach(exp => {
      const share = exp.amount / exp.participants.length;
      exp.participants.forEach(participant => {
        if (participant === exp.payer) return;
        const key = `${participant}->${exp.payer}`;
        balances[key] = (balances[key] || 0) + share;
      });
    });

    const summary = Object.entries(balances).map(([key, amount]) => {
      const [debtor, creditor] = key.split('->');
      return `${debtor} owes ${creditor} ₹${amount.toFixed(2)}`;
    });

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a new expense
router.post('/add', async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /api/groups → return all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  const exp = await Expense.findById(req.params.id);
  res.json(exp);
});

// PUT update
router.put('/:id', async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
