import React, { useEffect, useState } from 'react';
import API from '../api';

const BalanceSummary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await API.get('/expenses/summary');
      setSummary(res.data);
    };
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Heading outside the box */}
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
           Balance Summary
        </h2>

        {/* Card for summary list only */}
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          {summary.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {summary.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No summary available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BalanceSummary;
