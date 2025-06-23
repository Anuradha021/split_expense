import React, { useEffect, useState } from 'react';
import API from '../api';

const Home = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await API.get('/expenses');
      setExpenses(res.data);
    };
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-4xl font-bold mb-10 text-indigo-700 drop-shadow-sm">
           Split Expense Tracker
        </h1>

        <div className="bg-white rounded-xl shadow-2xl p-6 overflow-x-auto">
          <table className="w-full text-sm md:text-base">
            <thead className="bg-indigo-100 text-indigo-800">
              <tr>
                <th className="px-4 py-3 text-left">Payer</th>
                <th className="px-4 py-3 text-left">Participants</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr
                  key={exp._id}
                  className="border-b last:border-none hover:bg-indigo-50 transition duration-200"
                >
                  <td className="px-4 py-3">{exp.payer}</td>
                  <td className="px-4 py-3">{exp.participants.join(', ')}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">₹{exp.amount}</td>
                  <td className="px-4 py-3">{exp.description}</td>
                  <td className="px-4 py-3">{new Date(exp.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
