import { useContext, useState } from "react";
import { ProductContext } from "../components/ProductContext";

function useGetProducts()
{
    const [products,setProducts]=useState(useContext(ProductContext))
    return [products,setProducts];
}
export default useGetProducts;