import axios from "axios"
import { useEffect, useState } from "react" 

function AddProduct()
{    
        
    const [product,setProduct]=useState({name:"",
    descr:"",
    price:-1,
    cateogery:"",
    releaseDate:"",
    available:false,
    quantity:""})

    const [img,setImg] =useState(null)
    const handleInput =(e)=>{
        const name =e.target.name
        const val =e.target.value
        console.log(e.target.checked)
        if(name==="available")
        {
            setProduct({...product ,[name] : e.target.checked})
            return
        }
        
        setProduct({...product ,[name] : val})
        console.log(product);
        
    }
    const handleImg =(e)=>{
       //console.log(e.target.files[0]);
       setImg(e.target.files[0]);
       
    }
    const handleSubmit =async (e)=>{
        e.preventDefault();
        console.log("entry"); 
        const formData = new FormData();
        formData.append("imgFile",img)
        formData.append("product",new Blob([JSON.stringify(product)],{type:"application/json"}));
        axios.post("http://localhost:8080/products",formData,{headers:{"Content-Type":"multipart/form-data",},})
        .then((res)=>{alert("product added succesfully...");setProduct({})})
        .catch((error)=>alert("Error occured to add the product"+error))
           
    }
    return (
        <section className="add pt-8 bg-gray-100 flex flex-col justify-start items-center h-screen">
            <form action="" className="flex flex-wrap justify-center gap-4">
                <input type="text" name="name" id="name" className="fields" placeholder="product name" onChange={(e)=>{handleInput(e)}}  required/>
                <input type="text" name="descr" id="descr" className="fields" placeholder="product Description" onChange={(e)=>{handleInput(e)}} required/>
                <input type="text" name="brand" id="brand" className="fields" placeholder="brand" onChange={(e)=>{handleInput(e)}} required/>
                <input type="number" name="price" id="price" className="fields" placeholder="Price"onChange={(e)=>{handleInput(e)}} required/>
                <input type="text" name="cateogery" id="cateogory"className="fields" placeholder="cateogery" onChange={(e)=>{handleInput(e)}} required/>
                <input type="date" name="releaseDate" id="rdate" className="fields" placeholder="release date" onChange={(e)=>{handleInput(e)}} required/>
                <input type="number" name="quantity" id="quantity" className="fields" placeholder="Quantity" onChange={(e)=>{handleInput(e)}} required/>
                <input type="file" name="img" id="img" className="fields" onChange={(e)=>{handleImg(e)}}/>
                <div className="flex justify-center  w-full gap-4"><input type="checkbox"  name="available" id="available" className="border-1 p-2" onChange={(e)=>{handleInput(e)}}/><label className="text-2xl">isAvailable</label></div>
                <br />
                <div className="flex justify-center pt-8 gap-4">
                    <button className="btn text-white px-4 py-2 rounded-lg" onClick={(e)=>handleSubmit(e)}>Add Product</button>
                    <button className="btn  text-white px-4 py-2 rounded-lg" style={{background:"red"}}>Cancel</button>
                </div>
                 
            </form>
            
        </section>
    )
}

export default AddProduct