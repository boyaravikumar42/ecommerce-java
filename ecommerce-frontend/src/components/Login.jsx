
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
    <section>
        <h2 className="text-[3.2rem] font-bold text-center">login page</h2>
        <br />
        <input type="text" name="" id="" className="fields" placeholder="enter the username" onChange={e=>setName(e.target.value)} />
        <input type="button" name="" id="" value="login" className="btn ml-3"  onClick={handleLogin}/>
        <br />
        <Link to='/register' className=" text-2xl text-cyan-500">register</Link>
    </section> )
}
export default Login;