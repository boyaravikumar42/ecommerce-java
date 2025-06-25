import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Cart() {
    const [totals,setTotals]=useState({sub:0,tax:0,total:0})
    const items1=[
        {
            name:"ftrkjtrk",
            desc:"fetkeokeoteotejrhjkhk",
            quantity:9,
            price:600,
            id:1
        }
        ,
        {
            name:"ftrkjtrk",
            desc:"fetkeokeoteotejrhjkhk",
            quantity:8,
            price:600,
             id:2
        }
        ,
        {
            name:"ftrkjtrk",
            desc:"fetkeokeoteotejrhjkhk",
            quantity:23,
            price:600,
             id:3
        }  

    ]
    const [items,setItems]=useState(items1);
     useEffect(()=>{
           const calculate=()=>
           {
            var total=0;
            items.forEach((e)=>
            {
               total+=e.price*e.quantity;
            })
            console.log(total);
            
            setTotals({...totals,sub:total,tax:total*0.2,total:total+total*0.2})
           }
           calculate();   
        },[items])
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
                    {items.map((e)=><Item key={e.id} name={e.name} desc={e.desc} id={e.id} price={e.price} quantity={e.quantity} />)}
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
                <Link to='/products' className="btn">proceed to checkout</Link>
            </div>
        </section>
    )

}
function Item({name,desc,price,quantity})
{
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
            <div className="w-10 h-10 border-fuchsia-400 border-2 text-[1.4rem] text-center">{quantity}</div>
            <div className="text-[1.4rem]">${quantity*price}</div>
            {/* <br /> */}
        </div>
    )
}
export default Cart;