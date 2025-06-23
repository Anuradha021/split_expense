// AddExpense.jsx - Uses global header, consistent styling
import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const [groups, setGroups] = useState([]);
  const [expense, setExpense] = useState({
    payer: '',
    participants: '',
    amount: '',
    description: '',
    group: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await API.get('/groups');
      setGroups(res.data);
    };
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...expense,
      participants: expense.participants.split(',').map((p) => p.trim())
    };
    await API.post('/expenses/add', payload);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Add Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="group"
            className="border border-gray-300 p-3 rounded w-full"
            onChange={handleChange}
            required
          >
            <option value="">Select Group</option>
            {groups.map((g) => (
              <option key={g._id} value={g._id}>{g.name}</option>
            ))}
          </select>

          <input
            type="text"
            name="payer"
            placeholder="Payer"
            className="border border-gray-300 p-3 rounded w-full"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="participants"
            placeholder="Participants (comma separated)"
            className="border border-gray-300 p-3 rounded w-full"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="border border-gray-300 p-3 rounded w-full"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            className="border border-gray-300 p-3 rounded w-full"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded w-full"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
