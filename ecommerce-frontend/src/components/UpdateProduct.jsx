import axios from "axios"
import { useEffect, useState } from "react" 
import { useNavigate, useParams } from "react-router-dom"

function UpdateProduct()
{    
    const navigate =useNavigate()     
    const [product,setProduct]=useState({name:"",
    desc:"",
    price:-1,
    cateogery:"",
    releaseDate:"",
    available:false,
    quantity:""})
    
    //const [imgFile,setImgFile]=useState(null);
    const {id}=useParams()
    useEffect(()=>{
        axios.get(`http://localhost:8080/products/${id}`)
        .then((Response)=>{setProduct(Response.data); console.log(Response.data)})
        .catch((error)=>console.log("error occcured get the product ",error))

        axios.get(`http://localhost:8080/prodcuts/img/${id}`, { responseType: "blob" })
                    .then((response) => {
                         const file =new File(response.data,response.data.imgName,{type:blobData.type});
                         setImg(file);
                       
                        
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
        axios.put(`http://localhost:8080/updateproduct/${id}`,formData,{headers:{"Content-Type":"multipart/form-data",},})
        .then((res)=>alert("product updated succesfully..."))
        .catch((error)=>alert("Error occured to add the product"+error))
        navigate("/products")
           
    }
    return (
        <section className="pt-8 bg-gray-100 flex flex-col justify-start items-center h-screen">
            <form action="" className="flex flex-wrap justify-center gap-4">
                <input type="text" name="name" id="name" className="border-1 w-md h-8 px-2 py-4 rounded-lg" placeholder="product name" onChange={(e)=>{handleInput(e)}} value={product.name}/>
                <input type="text" name="desc" id="desc" className="border-1 w-md h-8 px-2 py-4 rounded-lg" placeholder="product Description" onChange={(e)=>{handleInput(e)}} value={product.desc}/>
                <input type="text" name="brand" id="brand" value={product.brand} className="border-1 w-md h-8 px-2 py-4 rounded-lg" placeholder="brand" onChange={(e)=>{handleInput(e)}}/>
                <input type="number" name="price" id="price" value={product.price} className="border-1 w-md h-8 px-2 py-4 rounded-lg" placeholder="Price"onChange={(e)=>{handleInput(e)}}/>
                <input type="text" name="cateogery" id="cateogory" value={product.cateogery} className="border-1 w-md h-8 px-2 py-4 rounded-lg" placeholder="cateogery" onChange={(e)=>{handleInput(e)}}/>
                <input type="date" name="releaseDate" id="rdate" value={product.releaseDate} className="border-1 w-md h-8 px-2 py-4 rounded-lg" placeholder="release date" onChange={(e)=>{handleInput(e)}}/>
                <input type="number" name="quantity" id="quantity" value={product.quantity} className="border-1 w-md h-8 px-2 py-4 rounded-lg" placeholder="Quantity" onChange={(e)=>{handleInput(e)}}/>
                <input type="file" name="img" id="img"  className="border-1 w-md h-8 px-2 pyb-6 rounded-lg" onChange={(e)=>{handleImg(e)}} required/>
                <div className="flex justify-start  w-md gap-4"><input type="checkbox"  checked={product.available} name="available"value={product.available} id="available" className="border-1 mx-4" onChange={(e)=>{handleInput(e)}}/><label>isAvailable</label></div>
                <div className="flex justify-center pt-8 gap-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={(e)=>handleSubmit(e)}>update</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Cancel</button>
                </div>
                 
            </form>
            
        </section>
    )
}

export default UpdateProduct;