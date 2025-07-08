import { useEffect, useState,} from "react";
import {useParams,Link,useNavigate} from 'react-router-dom';
import axios from "axios";
import {useLog} from './../context/LoginContext';
function ProductDetail() {

  const [product,setProduct]=useState({});
  const [quantity, setQuantity] = useState(1);
  const [image,setImage]=useState(null);
  const [item,setItem]=useState(null);
  const params =useParams();
  const [error, setError] = useState(null);
  const prodId =params.prodId;
  const {user}=useLog();
  const navigate = useNavigate();

  useEffect(
     ()=>{
      const fetchProduct =async()=>
      {
        axios.get(`${import.meta.env.VITE_BACK_END}/products/get/${prodId}`,
          {headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}}
        ).then((res)=>{
          // console.log("Product data fetched:", res);
          
          if(res.status===200)
          {
            setProduct(res.data);
          }
          else
          {
            console.log("product not found",);
            alert("product not found");
          }
        }).catch((error)=>{
          console.error("Error to fetching product data:", error);
          setError("Error fetching product data");
          // alert("Error fetching product data");
        })
      }

      const getImg =()=>{
        if(error)
          return;
        axios.get(`${import.meta.env.VITE_BACK_END}/products/img/${prodId}`,
              {
                responseType: "blob",
                headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}}  
            ).then((imageRes)=>{
              console.log("Image data fetched:", imageRes);
              
                
                 const url = URL.createObjectURL(imageRes.data);
               setImage(url); 
            } ).catch((error)=>{
              console.error("Error fetching image data:", error);
              // alert("Error fetching image data");
            });
          }
      
      if(!user)
      {
        alert("Please login to view product details");
        navigate("/login");
        return;
      }
       fetchProduct();
      getImg();
    }
  ,[]);


  const handleDelete = ()=>
        {
            axios.delete(`http://localhost:8080/products/delete/${prodId}`,
              {headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}}
            )
            .then((response)=>{alert(response.data); navigate("/products")})
            .catch((error)=>alert("error occured to delete data"))
        }

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (quantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }
    // handle add to cart logic
    axios.post(`${import.meta.env.VITE_BACK_END}/cart/add`, {
      productId: prodId,
      quantity: quantity,
      userId: user.userId
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } 
    })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data || "Product added to cart successfully");
        } else {
          alert("Failed to add product to cart");
        }
      }
      )
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        alert("Error adding product to cart");
      }); 

  };


  if (error) {
    return <div className="text-red-500 font-semibold text-[1.6rem] text-center !pt-[8rem]">{error}</div>;
  }
  return (
    <section className="w-full min-h-screen !py-[8rem]" style={{fontSize:"150%"}}>
      <div className="w-[100%] flex flex-col md:flex-row gap-10 bg-white  !p-6 rounded-lg">
        {/* Left Side: Product Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={ image}
            alt={product.name}
            className="w-full max-w-md object-contain rounded-md"
          />
        </div>

        {/* Right Side: Product Info */}
        <div className="md:w-1/2 space-y-4">
          {/* Category */}
          <p className="text-sm md:text-md text-gray-500 uppercase tracking-wider">
            {product.cateogery}
          </p>

          {/* Product Name */}
          <h1 className="text-2xl md:text-[2rem] lg:text-[3rem] font-bold text-gray-800">
            {product.name}
          </h1>

          {/* Price */}
          <p className="text-xl text-green-600 font-semibold">₹{product.price}</p>

          {/* Quantity & Add to Cart */}
          <form className="flex items-center gap-4" onSubmit={e=>handleAddToCart(e)}>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 border border-gray-300 rounded-md p-2 text-center"
            />
            <button
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white !px-5 !py-1 rounded-md font-semibold"
            >
              Add to Cart
            </button>
          </form>
          <br />
           {(user&& user.role !=="user") && <Link to={`/updateproduct/${prodId}`}><button className="bg-blue-500 hover:bg-blue-700 text-white !px-5 !py-1 rounded-md font-semibold">Update</button></Link>}
          {(user&& user.role ==="admin") && <button className="bg-red-500 hover:bg-red-700 text-white !px-5 !py-1 rounded-md font-semibold" onClick={handleDelete} style={{marginLeft:"1rem"}}>Delete</button>}
          {/* Product Description */}
         
          <div className="mt-6">
            <br />
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Description</h2>
            <p className="text-gray-600">{product.descr}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
