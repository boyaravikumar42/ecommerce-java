import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLog } from "../context/LoginContext";
import "./Navbar.css";

function Navbar() {
  const { user } = useLog();
  const [open, setOpen] = useState(false);

  const toggleNavbar = () => setOpen(!open);
  const closeNavbar = () => setOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-fuchsia-300 shadow-lg">
      <div className="flex items-center justify-between !px-[6rem] h-24">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-40 h-15" />
        </Link>

        {/* Hamburger Icon */}
        <button
          className="text-3xl md:hidden text-gray-800"
          onClick={toggleNavbar}
        >
          <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars-staggered"}`}></i>
        </button>

        {/* Nav Links */}
        <div
          className={`${
            open ? "flex" : "hidden"
          }  flex-col md:flex md:flex-row md:items-center md:gap-10  absolute text-2xl font-semibold text-gray-700  md:static bg-fuchsia-300 top-24 left-0 w-full md:w-auto px-6 py-4 md:p-0`}
        >
          <NavLink to="/" onClick={closeNavbar}>Home</NavLink>
          <NavLink to="/products" onClick={closeNavbar}>Products</NavLink>
          <NavLink to="/add" onClick={closeNavbar}>AddProduct</NavLink>
          <NavLink to="/cart" onClick={closeNavbar}>Cart</NavLink>
          {user.name ? (
            <NavLink to="/logout" className="text-red-700" onClick={closeNavbar}>
              {user.name}
            </NavLink>
          ) : (
            <NavLink to="/login" onClick={closeNavbar}>Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
// This is the Navbar component for the e-commerce application.
// It includes a responsive navigation bar with links to Home, Products, Add Product, Cart,