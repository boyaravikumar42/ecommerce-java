import axios from "axios"
import { useEffect, useState } from "react" 
import { useNavigate, useParams } from "react-router-dom"

function UpdateProduct()
{    
        
    const navigate =useNavigate()     
    const [product,setProduct]=useState({name:"",
    descr:"",
    price:-1,
    cateogery:"",
    releaseDate:"",
    available:false,
    quantity:0})
    const [error,setError]=useState(null);
    const [imgFile,setImgFile]=useState(null);
    const {id}=useParams();
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACK_END}/products/get/${id}`,{headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}})
        .then((Response)=>{
            if(Response.status===404)
            {
                setError("Product not found");
                return;
            }

            setProduct(Response.data); console.log(Response.data)})
        .catch((error)=>{
            console.log("error occcured get the product ",error)
             setError("Product not found");})

        axios.get(`${import.meta.env.VITE_BACK_END}/products/img/${id}`, 
                { responseType: "blob", 
                    headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
                })
                    .then((response) => {
                        const blob = new Blob([response.data], { type: 'image/png' }); // or 'application/pdf', etc.
                        const file = new File([blob], response.data.imgName, { type: blob.type });
                         setImg(file);
                         console.log(file);
                       
                        
                    })
                    .catch((error) => {
                        console.error("Error fetching image:", error);
                    });
    },[])

    const [img,setImg] =useState(null)
    const handleInput =(e)=>{
        const name =e.target.name
        const val =e.target.value
        if(name==="available" && val=="on")
        {
            setProduct({...product ,[name] : true})
            return
        }
        else{
            setProduct({...product ,[name] : false})
        }
        setProduct({...product ,[name] : val})
        console.log(product);
        
    }
    const handleImg =(e)=>{
       //console.log(e.target.files[0]);
       setImg(e.target.files[0]);
       
    }
    const handleSubmit =async (e)=>{
        e.preventDefault()
        console.log("entry"); 
        const formData = new FormData();
        formData.append("imgFile",img)
        formData.append("product",new Blob([JSON.stringify(product)],{type:"application/json"}));
        axios.put(`${import.meta.env.VITE_BACK_END}/products/updateproduct/${id}`,formData,
            {
                headers:{"Content-Type":"multipart/form-data",
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }})
        .then((res)=>alert("product updated succesfully..."))
        .catch((error)=>alert("Error occured to add the product"+error))
        navigate("/products")
           
    }
    if(error)
    {
        return <div className="flex justify-center items-center h-screen text-2xl text-red-500">{error}</div>
    }   
    return (
        <section className="add pt-8 bg-gray-100 flex flex-col justify-start items-center h-screen">
            <form action=""  className="flex flex-wrap justify-center gap-4" onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" name="name" id="name" className="fields" placeholder="product name" value={product.name} onChange={(e)=>{handleInput(e)}}  required/>
                <input type="text" name="descr" id="descr" className="fields" placeholder="product Description" value={product.descr} onChange={(e)=>{handleInput(e)}} required/>
                <input type="text" name="brand" id="brand" className="fields" placeholder="brand" value={product.brand} onChange={(e)=>{handleInput(e)}} required/>
                <input type="number" name="price" id="price" className="fields" placeholder="Price" value={product.price} onChange={(e)=>{handleInput(e)}} required/>
                <input type="text" name="cateogery" id="cateogory"className="fields" placeholder="cateogery" value={product.cateogery} onChange={(e)=>{handleInput(e)}} required/>
                <input type="date" name="releaseDate" id="rdate" className="fields" placeholder="release date" value={product.releaseDate} onChange={(e)=>{handleInput(e)}} required/>
                <input type="number" name="quantity" id="quantity" className="fields" placeholder="Quantity" value={product.quantity} onChange={(e)=>{handleInput(e)}} required/>
                <input type="file" name="img" id="img" className="fields" onChange={(e)=>{handleImg(e)}}/>
                <div className="flex flex-col  items-start w-full">
                    {
                    img ? <img src={URL.createObjectURL(img)} alt="Product" className="w-32 h-32 object-cover mt-2" /> : <p className="text-gray-500">No image selected</p>
                    }
                </div>
                <div className="flex justify-center  w-full gap-4"><input type="checkbox"  checked={available} name="available" id="available" className="border-1 p-2" onChange={(e)=>{handleInput(e)}}/><label className="text-2xl">isAvailable</label></div>
                <br />
                <div className="flex justify-center pt-8 gap-4">
                    <button type="submit" className=" text-white text-2xl !px-4 !py-2 rounded-md bg-fuchsia-500 hover:bg-fuchsia-700">Update</button>
                    <button className="  text-white text-2xl !px-4 !py-2 rounded-lg bg-gray-500 hover:bg-gray-700">Cancel</button>
                </div>
                 
            </form>
            
        </section>
    )
}

export default UpdateProduct;