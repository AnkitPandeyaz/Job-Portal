import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItem = [
    { path: "/", title: "Start A Search" },
    { path: "/my-jobs", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post A Job" },
    { path: "/dashboard", title: "Me" },
  ];

  return (
    <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <nav className='flex justify-between items-center py-6'> {/* Corrected items-center */}
        <a href="/" className='flex items-center gap-2 text-2xl text-black'> {/* Corrected items-center */}
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="39" viewBox="0 0 29 30" fill="none"> {/* Correct xmlns */}
            <circle cx="12.0143" cy="12.5143" r="12.0143" fill="#3575E2" fillOpacity="0.4" />
            <circle cx="12.0143" cy="12.5143" r="12.0143" fill="#3575E2" />
          </svg>
          <span>JobPortal</span>
        </a>

        {/* Navbar items for large device */}
        <ul className='hidden md:flex gap-12'>
          {navItem.map(({ path, title }) => (
            <li key={path} className='text-base text-primary'>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Signup and login button */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          <Link to="/login" className="py-2 px-5 border rounded">Log in</Link>
          <Link to="/sign-in" className="py-2 px-5 border rounded bg-blue text-white">Sign in</Link>
        </div>

        {/* Mobile menu */}
        <div className='md:hidden block'>
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <FaTimes className='w-5 h-5 text-primary' /> : <FaBars className='w-5 h-5 text-primary' />}
          </button>
        </div>
      </nav>

      {/* Nav items for mobile */}
      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}> {/* Fixed dynamic class syntax */}
        <ul>
          {navItem.map(({ path, title }) => (
            <li key={path} className='text-base text-white first:text-white py-1'>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className='text-white py-1'><Link to="/login">Log in</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

