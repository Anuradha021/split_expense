import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);        
app.use('/api/groups', groupRoutes);     
app.use('/api/expenses', expenseRoutes);



mongoose.connect('mongodb://localhost:27017/split-expense')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  })
  .catch(err => console.log(err));
