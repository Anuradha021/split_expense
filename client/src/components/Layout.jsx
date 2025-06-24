// Layout.jsx
import React from 'react';
import Header from '../pages/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-4">{children}</main>
    </>
  );
};

export default Layout;
