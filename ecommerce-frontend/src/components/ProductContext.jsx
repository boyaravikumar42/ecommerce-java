import axios from "axios";
import { createContext, useEffect, useState } from "react";

export  const ProductContext =createContext(null);

export const ProductProvider =({children})=>{
    const [products,setProduts] = useState([])

    useEffect(()=>{
      axios.get("http://localhost:8080/products")
    .then((response)=>{setProduts(response.data)})
    .catch((error)=>console.log("error occured to fetch the data..."+error))
    },[])
     return(
        <ProductContext.Provider value={products}>{children}</ProductContext.Provider>
     )
}