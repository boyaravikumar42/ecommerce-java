import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useLog } from "../context/LoginContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCartTotal } from "../context/CartTotalContext";
function Cart() {
    const [items,setItems]=useState([]);
    const {user}=useLog();
    const {cartTotal} = useCartTotal();
    const navigate = useNavigate();
     useEffect(()=>{
            const handleCart = async ()=>
            {
                // const userId =   user.id;
                // console.log(user);
                await axios.get(`${import.meta.env.VITE_BACK_END}/cart/items/${user.userId}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}   )
                .then((res)=>
                {
                     console.log(res);
                    if(res.status===204)
                    {
                       return;
                    }
                    setItems(res.data);

                    // const subTotal = res.data.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                    // const tax = subTotal * 0.1; // Assuming a tax rate of 10%
                    // const total = subTotal + tax;
                    // setTotals({sub:subTotal,tax:tax,total:total});
                })
                .catch((error)=>
                {
                    console.error("Error fetching cart items:", error);
                    alert("Error fetching cart items");
                });
            };
            if(user.name===null)
            {
                navigate("/login");
                return;
            }
            else if(user.verified===false)
            {
                // alert("Please verify your email to view cart items");
                navigate("/register");
                return;
            }
            handleCart();
        },[cartTotal])

        if(items.length===0)
        {
            return (
                <div className="!pt-[10rem] flex justify-center text-[2rem] font-semibold text-indigo-950">no items in the cart</div>
            )
        }
    return (
        <section className="">
            <div>
                <div className="cols flex justify-between bg-fuchsia-400 h-10 text-[1.4rem] text-white">
                    <div >products</div>
                    <div className="md:!pl-[40%]">Quantity</div>
                    <div>SubTotal</div>
                    {/* <br className="hidden md:block"/> */}
                </div>
                <div  className="flex flex-col gap-2">
                    {items.map((e)=><Item key={e.cartId}   cartId={e.cartId} productId={e.productId} quantity={e.quantity} />)}
                </div>
            </div>
             <br />
            <br />
            <div className="border-t-4 border-fuchsia-400">
                 <br />
                <div className="grid grid-cols-2 gap-2 mt-4 text-[1.2rem] font-semibold">
                    <p>subtotal</p>
                    <p>{cartTotal}</p>
                    <p>{"discount (12%)"}</p>
                    <p>{cartTotal*0.12}</p>
                    <p className="font-bold text-2xl">Total</p>
                    <p className="font-bold  text-2xl">{cartTotal-(cartTotal*0.12)}</p>
                </div>
                <br />
                <br />
            </div>
        </section>
    )

}

function Item({cartId,productId,quantity})
{
    const [product,setProduct]=useState({descr:""});
    const [qty,setQuantity]=useState(quantity);
    const [image,setProductImage]=useState(null);
    const {cartTotal,updateCartTotal} = useCartTotal();
    const cahangeQuantity =(e)=>
    {
        e.preventDefault()
        console.log(qty);
        
    }
    useEffect(()=>
    {
        const getProduct=()=>{
            axios.get(`${import.meta.env.VITE_BACK_END}/products/get/${productId}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
            .then((res)=>
            {
                if(res.status===200)
                {
                    setProduct(res.data);
                }
                else
                {
                    console.log("Error to fetching product details");
                }
            })  
        };
        getProduct();
        updateCartTotal(cartTotal+product.price*quantity);
        
    },[])

    useEffect(()=>{
        const getImg = ()=>{
            axios.get(`${import.meta.env.VITE_BACK_END}/products/img/${productId}`,{
                responseType: "blob",
                headers: {Authorization:`Bearer ${localStorage.getItem("token")}`},
            })
            .then((res)=>{
                if(res.status===200)
                {
                    const url = URL.createObjectURL(res.data);
                    setProductImage(url);
                    console.log("Product image URL:", url);
                }
                else
                {
                    console.log("Error to fetching product image");
                }
            }).catch((error)=>{
                console.error("Error fetching product image:", error);
                alert("Error fetching product image");
            })  
        };
        getImg();
    },[])

    const submitQuantityChange = (e) => {
        e.preventDefault();
        if (qty <= 0) {
            alert("Quantity must be greater than 0");
            return;
        }
        axios.put(`${import.meta.env.VITE_BACK_END}/cart/update/${cartId}?quantity=${qty}`, { quantity: qty }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            .then((res) => {
                if (res.status === 200) {
                    alert("Quantity updated successfully");
                } else {
                    alert("Error updating quantity");
                }
            })
            .catch((error) => {
                console.error("Error updating quantity:", error);
                alert("Error updating quantity");
            });
    }

    return (
        <div className="flex justify-between items-center">
           
           <Link to={`/productdetails/${productId}`} className="flex items-center gap-2">
             <div className="flex gap-5 mt-5 flex-col md:flex-row ">
                <img src={ image} alt={product.name} className="w-40 h-40"/>
                <div className="content">
                    <h2 className="text-[1.4rem] font-bold">{product.name}</h2>
                    <p className="text-[1.4rem] hidden md:block">{product.descr.substring(0,50)}...</p>
                    <p className="text-[1.2rem] text-fuchsia-400">price: {product.price} /-</p>
                </div>
            </div>
            </Link>
           <div>
             <form onSubmit={(e)=>submitQuantityChange(e)}>
                <input className="w-10 h-10 border-fuchsia-400 border-2 text-[1.4rem] text-center " value={qty} onChange={(e)=>{setQuantity(e.target.value)}}></input>
                <button type="submit" className="bg-fuchsia-400 hover:bg-fuchsia-600 text-[1.2rem] !py-1 !px-1 text-amber-50 text-md rounded-md" style={{marginLeft:"5px"}}>change</button>
             </form>
           </div>
            <div className="text-[1.4rem]">{quantity*product.price} /-</div>
            {/* <br /> */}
        </div>
    )
}
export default Cart;

//custom hook to set the total
// const useTotal = () => {
//     const [total, setTotal] = useState(0);

//     const addTotal = (price, quantity) => {
//         setTotal(() => total + (price * quantity));
//     }


//     return [total, addTotal];
// }