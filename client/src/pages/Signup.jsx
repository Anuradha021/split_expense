import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ import context

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ use context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/signup', form);

      // ✅ Save token and set user
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);

      navigate('/'); // ✅ Redirect now works as expected
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Signup</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border mb-4 rounded" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border mb-4 rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border mb-4 rounded" required />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
