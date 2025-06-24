import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const expRes = await API.get('/expenses');
      const groupRes = await API.get('/groups');
      setExpenses(expRes.data);
      setGroups(groupRes.data);
      setFilteredExpenses(expRes.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = expenses;

    if (search) {
      filtered = filtered.filter(exp =>
        exp.payer.toLowerCase().includes(search.toLowerCase()) ||
        exp.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedGroup) {
      filtered = filtered.filter(exp => exp.group === selectedGroup);
    }

    setFilteredExpenses(filtered);
  }, [search, selectedGroup, expenses]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await API.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center">
           Split Expense Tracker
        </h1>

        {/* Action Panel */}
        <div className="bg-white border border-gray-200 p-4 mb-6 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search payer or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-300 p-2 rounded w-full md:w-1/3"
          />

          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-300 p-2 rounded w-full md:w-1/4"
          >
            <option value="">All Groups</option>
            {groups.map(g => (
              <option key={g._id} value={g._id}>{g.name}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="table-auto w-full text-sm">
            <thead className="bg-indigo-200 text-indigo-800">
              <tr>
                <th className="px-4 py-3 text-left">Payer</th>
                <th className="px-4 py-3 text-left">Participants</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No expenses found
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((exp) => (
                  <tr key={exp._id} className="border-b last:border-none hover:bg-indigo-50 transition">
                    <td className="px-4 py-2">{exp.payer}</td>
                    <td className="px-4 py-2">{exp.participants.join(', ')}</td>
                    <td className="px-4 py-2 font-semibold text-green-700">₹{exp.amount}</td>
                    <td className="px-4 py-2">{exp.description}</td>
                    <td className="px-4 py-2">{new Date(exp.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button
  onClick={() => navigate(`/edit/${exp._id}`)}
  className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition"
>
  Edit
</button>
                        <button
                          onClick={() => handleDelete(exp._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
