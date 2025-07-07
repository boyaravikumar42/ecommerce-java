
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLog } from "../context/LoginContext";
import axios from "axios";
function Login()
{
    const [userDetails,setUser]=useState({email:"",password:""});
    const {user,login} = useLog();
    const navigate =useNavigate();

    useEffect(()=>
    {
        if(user.name)
            navigate('/');
    },[])
    
    const handleLogin=()=>
    {
        if(userDetails.email.trim() === '')
        {
            alert("Please enter your name");
            return;
        }
        if(userDetails.password.trim() === '')
        {
            alert("Please enter your password");
            return;
        }
        // Simulate a login process
        axios.post(`http://localhost:8080/auth/login`, userDetails)
        .then((res) => {
            console.log("Login response:", res);
            if(res.status === 200)
            {
                // Assuming the response contains a token
                const token = res.data.password;
                console.log("Token received:", token);
                localStorage.setItem("token", token);
                login(res.data); // Update context with user email
                navigate("/products");
            }
            else if(res.status === 203)
            {
                alert("User does not exist. Please register.");
            }
        })
        .catch((err) => {
            console.error("Login error:", err);
            alert("invalid credentials");
        });
    }
    return ( 
    <section className="flex flex-col justify-center items-center h-screen" style={{padding:"5% 0"}}>
        <h2 className="text-[3.2rem] font-bold text-center text-indigo-950">login page</h2>
        <br />
        <div className="login-wrapper flex flex-col justify-center items-center gap-4 h-[50vh] md:h-[60vh] w-[90%] md:w-[400px] m-auto rounded-lg shadow-xs hover:shadow-md shadow-fuchsia-400 border-1 border-fuchsia-500 ">
            <div className="flex  justify-center items-center gap-2">
                <img src="./logo.png" alt="login" className="w-[8rem] h-[5rem]" />
                <h2 className="text-[2rem] font-semibold ">login to explore more...</h2>
            </div>
            <br />
            <input type="text" placeholder="Enter your mail" className=" h-[3rem]  border-2 border-fuchsia-500 rounded-lg p-2 w-[90%] text-[1.4rem]" name="email" value={userDetails.email} onChange={(e)=>setUser({...userDetails,email:e.target.value})} />
            
            <input type="password" placeholder="Enter your password" className=" h-[3rem] border-2 border-fuchsia-500 rounded-lg p-2 w-[90%] text-[1.4rem]" name="password" value={userDetails.password} onChange={(e)=>setUser({...userDetails,password:e.target.value})} />
           
            <div className="flex  w-[80%]">
                <Link to="/register" className="text-blue-600 text-[1.6rem] ">Register ?</Link>
            </div>
            <br />
            <button className="w-[90%] h-[3rem] bg-fuchsia-500 text-white rounded-lg p-2  text-[1.6rem] mt-4" onClick={handleLogin}>Login</button>
    
        </div>
    </section> )
}
export default Login;