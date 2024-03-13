import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarForLoggedInUsers from './NavbarForLoggedInUsers';


const Layout = ({ loggedInUser }) => {
  return (
    <div>
      {loggedInUser && <NavbarForLoggedInUsers />}
      <main>
        <Outlet /> {/* Child routes are rendered here */}
      </main>
    </div>
  );
};

export default Layout;
