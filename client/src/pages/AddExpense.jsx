// src/pages/AddExpense.jsx
import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]); // members of selected group
  const [expense, setExpense] = useState({
    payer: '',
    participants: [],
    amount: '',
    description: '',
    group: ''
  });

  const navigate = useNavigate();

  // Get all groups user created
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await API.get('/groups');
        setGroups(res.data);
      } catch (err) {
        console.error('Failed to fetch groups:', err);
      }
    };
    fetchGroups();
  }, []);

  // Fetch members of selected group
  const handleGroupChange = async (e) => {
    const groupId = e.target.value;
    setExpense(prev => ({
      ...prev,
      group: groupId,
      payer: '',
      participants: []
    }));

    if (groupId) {
      try {
        const res = await API.get(`/groups/${groupId}`);
        setMembers(res.data.members);
      } catch (err) {
        console.error('Failed to fetch group members:', err);
        setMembers([]);
      }
    } else {
      setMembers([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === 'participants') {
      const values = Array.from(selectedOptions).map(opt => opt.value);
      setExpense(prev => ({ ...prev, participants: values }));
    } else {
      setExpense(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/expenses/add', expense);
      navigate('/');
    } catch (err) {
      console.error('Expense creation failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Add Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Group selection */}
          <select
            name="group"
            className="border border-gray-300 p-3 rounded w-full"
            onChange={handleGroupChange}
            value={expense.group}
            required
          >
            <option value="">Select Group</option>
            {groups.map((g) => (
              <option key={g._id} value={g._id}>{g.name}</option>
            ))}
          </select>

          {/* Payer + Participants show only after group selected */}
          {members.length > 0 && (
            <>
              <select
                name="payer"
                className="border border-gray-300 p-3 rounded w-full"
                onChange={handleChange}
                value={expense.payer}
                required
              >
                <option value="">Select Payer</option>
                {members.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select
                name="participants"
                className="border border-gray-300 p-3 rounded w-full"
                multiple
                value={expense.participants}
                onChange={handleChange}
                required
              >
                {members.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </>
          )}

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="border border-gray-300 p-3 rounded w-full"
            onChange={handleChange}
            value={expense.amount}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            className="border border-gray-300 p-3 rounded w-full"
            onChange={handleChange}
            value={expense.description}
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
