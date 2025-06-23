// ViewGroups.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';

const ViewGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await API.get('/groups');
        setGroups(res.data);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
           All Groups
        </h2>

        {groups.length === 0 ? (
          <p className="text-center text-gray-500">No groups found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <div
                key={group._id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200"
              >
                <p className="text-lg font-semibold text-gray-800 mb-1">
                  Group: {group.name}
                </p>
                <p className="text-gray-600 text-sm">
                  Members:{' '}
                  <span className="italic">{group.members.join(', ')}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewGroups;
