import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/add-expense', label: 'Add Expense' },
    { path: '/create-group', label: 'Create Group' },
    { path: '/groups', label: 'View Groups' },
    { path: '/balance-summary', label: 'Balance Summary' },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-200 via-purple-100 to-blue-100 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-4 items-center justify-center md:justify-start">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm md:text-base font-medium px-3 py-1 rounded-md transition-colors ${
              location.pathname === link.path
                ? 'bg-indigo-600 text-white'
                : 'text-indigo-800 hover:bg-indigo-300/60 hover:text-indigo-900'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
