// CreateGroup.jsx - Uses global header, consistent styling
import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
  const [group, setGroup] = useState({ name: '', members: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...group,
      members: group.members.split(',').map(m => m.trim())
    };
    await API.post('/groups/create', payload);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center"> Create New Group</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Group Name"
            className="border border-gray-300 p-3 rounded w-full"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="members"
            placeholder="Members (comma separated)"
            className="border border-gray-300 p-3 rounded w-full"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded w-full"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
