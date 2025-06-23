// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-6">
        <Link to="/" className="text-indigo-700 font-semibold hover:text-indigo-900 no-underline">
          Home
        </Link>
        <Link to="/add-expense" className="text-indigo-700 font-semibold hover:text-indigo-900 no-underline">
          Add Expense
        </Link>
        <Link to="/create-group" className="text-indigo-700 font-semibold hover:text-indigo-900 no-underline">
          Create Group
        </Link>
        <Link to="/view-groups" className="text-indigo-700 font-semibold hover:text-indigo-900 no-underline">
          View Groups
        </Link>
        <Link to="/balance-summary" className="text-indigo-700 font-semibold hover:text-indigo-900 no-underline">
          Balance Summary
        </Link>
      </div>
    </header>
  );
};

export default Header;
