import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import CreateGroup from './pages/CreateGroup';
import ViewGroups from './pages/ViewGroups';
import BalanceSummary from './pages/BalanceSummary';
import EditExpense from './pages/EditExpense';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RequireAuth from './components/RequireAuth';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* 🔒 Protected Routes */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/add-expense"
            element={
              <RequireAuth>
                <AddExpense />
              </RequireAuth>
            }
          />
          <Route
            path="/create-group"
            element={
              <RequireAuth>
                <CreateGroup />
              </RequireAuth>
            }
          />
          <Route
            path="/view-groups"
            element={
              <RequireAuth>
                <ViewGroups />
              </RequireAuth>
            }
          />
          <Route
            path="/balance-summary"
            element={
              <RequireAuth>
                <BalanceSummary />
              </RequireAuth>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <RequireAuth>
                <EditExpense />
              </RequireAuth>
            }
          />

          {/* 🌐 Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
