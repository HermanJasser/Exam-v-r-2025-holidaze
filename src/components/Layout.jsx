import React from 'react';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main class=" mt-[80px]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;