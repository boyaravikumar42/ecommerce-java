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
    <nav className={`${open ?  "min-h-[20rem]": "min-h-[5rem]"} fixed top-0 w-full z-50 bg-fuchsia-300 shadow-lg`}>
      <div className="flex items-center justify-between md:!px-[6rem] !px-[3rem] h-24">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-40 h-15" />
        </Link>


        {/* Nav Links */}
        <div
          className={`${
            open ? "flex h-[14rem] " : "hidden"
          }  flex-col md:flex md:flex-row md:items-center justify-evenly md:gap-20  absolute text-2xl font-semibold text-gray-700  md:static bg-fuchsia-300 top-24 left-0 w-full md:w-auto !px-[3rem] !py-4 md:p-0`}
        >
          <NavLink to="/" onClick={closeNavbar}><i className="fa-solid fa-home"></i> Home</NavLink>
          <NavLink to="/products" onClick={closeNavbar}><i className="fa-duotone fa-solid fa-bag-shopping"></i> Products</NavLink>
          <NavLink to="/add" onClick={closeNavbar}><i className="fas fa-upload"></i> AddProduct</NavLink>
          <NavLink to="/cart" onClick={closeNavbar}><i className="fa-solid fa-shopping-cart"></i> Cart</NavLink>
        </div>
         <div className="flex items-end gap-10">
          {user.name ? (
            <NavLink to="/logout" className="text-fuchsia-950 font-semibold text-[1.4rem]" onClick={closeNavbar}>
              {user.name}
            </NavLink>
          ) : (
            <NavLink to="/login" className="font-semibold text-[1.6rem]" onClick={closeNavbar}>Login <i className="fas fa-sign-in-alt"></i></NavLink>
          )}
          
        {/* Hamburger Icon */}
        <button
          className="text-3xl md:hidden text-gray-800"
          onClick={toggleNavbar}
        >
          <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars-staggered"}`}></i>
        </button>
         </div>

        {/* User Icon */}
        
      </div>
    </nav>
  );
}

export default Navbar;
// This is the Navbar component for the e-commerce application.
// It includes a responsive navigation bar with links to Home, Products, Add Product, Cart,