import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useLog } from "../context/LoginContext";
import axios from "axios";

function Cart() {
    const [totals,setTotals]=useState({sub:0,tax:0,total:0})
    const [items,setItems]=useState([]);
    const {user}=useLog();

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
                    // console.log("Cart items:", res);
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
            handleCart();
        },[])

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
                    <div>Quantity</div>
                    <div>SubTotal</div>
                    {/* <br className="hidden md:block"/> */}
                </div>
                <div>
                    {items.map((e)=><Item key={e.cartId}  desc={e.desc} id={e.id} price={e.price} quantity={e.quantity} />)}
                </div>
            </div>
             <br />
            <br />
            <div className="border-t-4 border-fuchsia-400">
                 <br />
                <div className="grid grid-cols-2 gap-2 mt-4 text-[1.2rem] font-semibold">
                    <p>subtotal</p>
                    <p>{totals.sub}</p>
                    <p>tax</p>
                    <p>{totals.tax}</p>
                    <p className="font-bold text-2xl">Total</p>
                    <p className="font-bold  text-2xl">{totals.total}</p>
                </div>
                <br />
                <br />
            </div>
        </section>
    )

}
function Item({name,desc,price,quantity})
{
    const [qty,setQuantity]=useState(quantity);
    const cahangeQuantity =(e)=>
    {
        e.preventDefault()
        console.log(qty);
        
    }
    return (
        <div className="flex justify-between items-center">
           
            <div className="flex gap-5 mt-5 flex-col md:flex-row">
                <img src="./hero.png" alt="" className="w-40 h-40"/>
                <div className="content">
                    <h2 className="text-[1.4rem] font-bold">{name}</h2>
                    <p className="text-[1.4rem] hidden md:block">{desc}</p>
                    <p className="text-[1.2rem] text-fuchsia-400">price: ${price}</p>
                </div>
            </div>
           <div>
             <form onSubmit={(e)=>cahangeQuantity(e)}>
                <input className="w-10 h-10 border-fuchsia-400 border-2 text-[1.4rem] text-center" value={qty} onChange={(e)=>{setQuantity(e.target.value)}}></input>
                <button type="submit" className="bg-fuchsia-400 !py-1 !px-1 text-amber-50 text-md rounded-md" style={{marginLeft:"5px"}}>change</button>
             </form>
           </div>
            <div className="text-[1.4rem]">${quantity*price}</div>
            {/* <br /> */}
        </div>
    )
}
export default Cart;