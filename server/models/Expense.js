import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  payer: String,
  participants: [String],
  amount: Number,
  description: String,
  date: { type: Date, default: Date.now },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  }
});

export default mongoose.model('Expense', expenseSchema);
