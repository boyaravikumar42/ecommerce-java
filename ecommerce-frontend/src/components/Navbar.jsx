import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"
import axios from "axios";
import Home from "./Home";
import { useLog } from "../context/LoginContext";
function Navbar()
{
   
    const {user }=useLog();
    return (
        <div className=" w-full bg-transparent shadow-lg z-40  fixed">
            <nav className="">
            <div> <Link to='/' id="logo"><img src="./logo.png" alt=""className="w-40 h-15"/></Link> </div>
            <div> 
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/add">addproduct</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                {
                     user ? (<NavLink to="/logout" className="text-red-700">{user}</NavLink>) : (<NavLink to="/login">login</NavLink>)
                }

            </div>  
        </nav>
        </div>
    )
}
export default Navbar;