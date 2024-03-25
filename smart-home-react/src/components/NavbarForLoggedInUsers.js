import React from "react";
import { Link } from "react-router-dom";

const NavbarForLoggedInUsers = () => {
  // URL of your logo
  const logoUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png";

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <div className="flex items-center">
        <img src={logoUrl} alt="Logo" className="h-8" />{" "}
        {/* Adjust the height as needed */}
      </div>

      <ul className="flex items-center">
        <li>
          <Link to="/" className="hover:bg-blue-700 p-2 rounded">
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:bg-blue-700 p-2 rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/settings" className="hover:bg-blue-700 p-2 rounded">
            Settings
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:bg-blue-700 p-2 rounded">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarForLoggedInUsers;
