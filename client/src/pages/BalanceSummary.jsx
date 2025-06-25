import React, { useEffect, useState } from 'react';
import API from '../api';

const BalanceSummary = () => {
  const [groupedSummary, setGroupedSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await API.get('/expenses/summary');
      setGroupedSummary(res.data);
    };
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Balance Summary</h2>

        {groupedSummary.length > 0 ? (
          groupedSummary.map((group, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-lg mb-6">
  <h3 className="text-xl font-semibold text-indigo-600 mb-4">{group.groupName}</h3>
  {Array.isArray(group.summary) && group.summary.length > 0 ? (
    <ul className="list-disc pl-6 space-y-1 text-gray-700">
      {group.summary.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">No expenses yet.</p>
  )}
</div>
          ))
        ) : (
          <p className="text-center text-gray-500">No summary available.</p>
        )}
      </div>
    </div>
  );
};

export default BalanceSummary;
