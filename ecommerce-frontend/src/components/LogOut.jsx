import { useNavigate } from 'react-router-dom';
import {useLog} from '../context/LoginContext';
import { useEffect } from 'react';
const LogOut = ()=>
{
    const {user,logout}=useLog();
    const navigate=useNavigate();


        // useEffect(()=>{
        //         if(!user)
        //             navigate('/');
        // },[]);

    const logoutHandle =()=>
    {
        logout();
        navigate('/');
    }

    return (
        <section className='flex flex-col justify-start items-center'>
            <h2 className='text-[3.2rem] font-bold text-fuchsia-400'>LogOut page</h2>
            <button onClick={logoutHandle} className='btn'>Logut</button>
        </section>
    )
}
export default LogOut;
