
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLog } from "../context/LoginContext";
function Login()
{
    const [name,setName]=useState('');
    const {user,login} = useLog();
    const navigate =useNavigate();

    useEffect(()=>
    {
        if(user)
            navigate('/');
    },[])
    
    const handleLogin=()=>
    {
       if(name !== null )
         {
            login(name);
            navigate('/')
         }
        console.log(user);
    }

    return ( 
    <section className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-[3.2rem] font-bold text-center">login page</h2>
        <br />
        <div className="login-wrapper flex flex-col justify-center items-center gap-4 h-[60vh] w-[400px] m-auto rounded-lg shadow-2xl shadow-fuchsia-400 border-1 border-fuchsia-500 ">
            <div className="flex  justify-center items-center gap-2">
                <img src="./logo.png" alt="login" className="w-[8rem] h-[5rem]" />
                <h2 className="text-[2rem] font-semibold ">login to explore more</h2>
            </div>
            <br />
            <input type="text" placeholder="Enter your name" className="w-[80%] h-[3rem]  border-2 border-fuchsia-500 rounded-lg p-2 w-[30vw] text-[1.4rem]" value={name} onChange={(e)=>setName(e.target.value)} />
            
            <input type="password" placeholder="Enter your password" className="w-[80%] h-[3rem] border-2 border-fuchsia-500 rounded-lg p-2 w-[30vw] text-[1.4rem]" />
           
            <div className="flex  w-[80%]">
                <Link to="/register" className="text-blue-600 text-[1.6rem] ">Register ?</Link>
            </div>
            <br />
            <button className="w-[80%] h-[3rem] bg-fuchsia-500 text-white rounded-lg p-2 w-[30vw] text-[1.6rem] mt-4" onClick={handleLogin}>Login</button>
    
        </div>
    </section> )
}
export default Login;