import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import {useLog} from '../context/LoginContext';

function ProdDesc()
{
    const [product,setProduct]=useState({});
    const [imgUrl,setImgurl]=useState(null);
    let {id} =useParams();
    const navigate =useNavigate();

    const {user}=useLog();
      
       
    useEffect(()=>{
        if(!user)
        {
            navigate("/login")
            return;
        }
        axios.get(`http://localhost:8080/products/${id}`)
        .then((Response)=>{setProduct(Response.data);})
        .catch((error)=>console.log("error occcured get the product ",error))

        axios.get(`http://localhost:8080/products/img/${id}`, { responseType: "blob" })
                    .then((response) => {
                        const url = URL.createObjectURL(response.data);
                        setImgurl(url);
                    })
                    .catch((error) => {
                        console.error("Error fetching image:", error);
                    });   },[])

        const handleDelete = ()=>
        {
            axios.delete(`http://localhost:8080/products/delete/${id}`)
            .then((response)=>{alert(response.data); navigate("/products")})
            .catch((error)=>alert("error occured to delete data"))
        }
    
    
    return (
       <div className="flex flex-wrap justify-center items-center h-screen gap-2 lg:flex-col">
        <div className="">
            <img src={imgUrl||'ns.jpeg'} alt="" className="w-lg h-md " />
            <h2>{product.releaseDate}</h2>
        </div>
        <div>
            <h4 className=" text-blue-600">{product.cateogery}</h4>
            <h2>{product.desc}</h2>
            <hr />
            <h1 className="font-bold text-fuchsia-600 text-2xl">{product.name}</h1>
            <h2>{product.brand}</h2>
            <Link to={`/updateproduct/${id}`}><button className="bg-blue-500 rounded-2xl p-2 shadow-2xs">Update</button></Link>
            <button className="bg-red-500 rounded-2xl p-2 shadow-2xs " onClick={handleDelete}>Delete</button>
        </div>
       </div>
    )
}
export default ProdDesc;