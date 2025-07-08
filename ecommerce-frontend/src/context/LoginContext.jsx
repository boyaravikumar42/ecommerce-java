import React,{createContext, use, useContext,useEffect,useState} from "react";
import axios from "axios";
export const LoginContext = React.createContext(null);


export const LoginContextProvider = ({children})=>
{
        const [user,setUser] =useState({name:null});

        useEffect(()=>
        {
            const token = localStorage.getItem("token");
            if(token)
            {
                axios.get(`${import.meta.env.VITE_BACK_END}/auth/user`
                ,{headers:{Authorization:`Bearer ${token}`}})
                .then((res)=>
                {
                    if(res.status!==200)
                    {
                        console.error("Failed to fetch user data");
                        logout();
                        return;
                    }
                    login(res.data);
                    console.log(res);
                    
                })
                .catch((error)=>
                {
                    console.error("Error fetching user data:", error);
                    logout();
                }); 
            }
        },[]);

        const login =(obj)=>
        {
            setUser(obj);
        }
        const logout=()=>
        {
            setUser({name:null});
        }

    return (
    <LoginContext.Provider value={{user,login,logout}}>
        {children}
    </LoginContext.Provider>)
}

export const useLog =()=>
{
    return useContext(LoginContext);
}