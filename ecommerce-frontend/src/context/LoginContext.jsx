import React,{createContext, useContext,useState} from "react";

export const LoginContext = React.createContext(null);


export const LoginContextProvider = ({children})=>
{
        const [user,setUser] =useState(null);

        const login =(str)=>
        {
            setUser(str);
        }
        const logout=()=>
        {
            setUser(null);
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