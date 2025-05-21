import React from 'react';

import Header from './Nav/Header';
import Footer from './Nav/Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="mt-[80px] mb-[80px]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;