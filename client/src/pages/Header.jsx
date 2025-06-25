import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ import context

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ access auth state
 const isLogin = location.pathname === '/login';
  const isSignup = location.pathname === '/signup';
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/add-expense', label: 'Add Expense' },
    { path: '/create-group', label: 'Create Group' },
    { path: '/view-groups', label: 'View Groups' },
    { path: '/balance-summary', label: 'Balance Summary' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-200 via-purple-100 to-blue-100 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-4 items-center justify-between">

        {/* Left - Nav Links */}
        <div className="flex flex-wrap gap-3">
          {user && navLinks.map((link) => (
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

        {/* Right - Auth Buttons */}
        <div className="flex gap-3">
          {!user ? (
            <>
               <div className="flex justify-end space-x-4 px-6 py-4 bg-gradient-to-r from-indigo-100 to-purple-100 shadow">
      <Link
        to="/login"
        className={`px-4 py-2 rounded font-semibold transition ${
          isLogin
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
        }`}
      >
        Login
      </Link>
      <Link
        to="/signup"
        className={`px-4 py-2 rounded font-semibold transition ${
          isSignup
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
        }`}
      >
        Signup
      </Link>
    </div>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
