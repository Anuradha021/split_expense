import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; // back arrow icon

const EditExpense = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      const res = await API.get(`/expenses/${id}`);
      setExpense(res.data);
    };
    const fetchGroups = async () => {
      const res = await API.get('/groups');
      setGroups(res.data);
    };
    fetchExpense();
    fetchGroups();
  }, [id]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedParticipants = Array.isArray(expense.participants)
      ? expense.participants
      : expense.participants.split(',').map(p => p.trim());

    const payload = {
      ...expense,
      participants: formattedParticipants
    };

    await API.put(`/expenses/${id}`, payload);
    navigate('/');
  };

  if (!expense) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      {/* Styled Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition duration-200"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>

      <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="group" value={expense.group} onChange={handleChange} className="border p-2 w-full">
          <option value="">Select Group</option>
          {groups.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
        </select>
        <input type="text" name="payer" value={expense.payer} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="participants" value={expense.participants.join(', ')} onChange={handleChange} className="border p-2 w-full" />
        <input type="number" name="amount" value={expense.amount} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="description" value={expense.description} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
