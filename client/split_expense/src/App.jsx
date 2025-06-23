// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import CreateGroup from './pages/CreateGroup';
import ViewGroups from './pages/ViewGroups';
import BalanceSummary from './pages/BalanceSummary';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/view-groups" element={<ViewGroups />} />
          <Route path="/balance-summary" element={<BalanceSummary />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
