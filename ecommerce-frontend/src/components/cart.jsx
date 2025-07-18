import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLog } from "../context/LoginContext";
import axios from "axios";

function Cart() {
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState({});
    const [images, setImages] = useState({});
    const [total, setTotal] = useState(0);
    const { user } = useLog();
    const navigate = useNavigate();

    // Fetch Cart Items
    useEffect(() => {
        const handleCart = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACK_END}/cart/items/${user?.userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                if (res.status === 204) return;
                setItems(res.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
                alert("Error fetching cart items");
            }
        };

        if (!user?.name) return navigate("/login");
        if (!user?.verified) return navigate("/register");

        handleCart();
    }, []);

    // Fetch products and calculate total
    useEffect(() => {
        const fetchData = async () => {
            let totalAmount = 0;
            const prodMap = {};
            const imageMap = {};

            await Promise.all(
                items.map(async (item) => {
                    try {
                        const productRes = await axios.get(
                            `${import.meta.env.VITE_BACK_END}/products/get/${item.productId}`,
                            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                        );

                        if (productRes.status === 200) {
                            prodMap[item.cartId] = productRes.data;
                            totalAmount += productRes.data.price * item.quantity;
                        }

                        const imgRes = await axios.get(
                            `${import.meta.env.VITE_BACK_END}/products/img/${item.productId}`,
                            {
                                responseType: "blob",
                                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                            }
                        );

                        if (imgRes.status === 200) {
                            const url = URL.createObjectURL(imgRes.data);
                            imageMap[item.cartId] = url;
                        }
                    } catch (err) {
                        console.error("Product fetch failed:", err);
                    }
                })
            );

            setProducts(prodMap);
            setImages(imageMap);
            setTotal(totalAmount);
        };

        if (items.length > 0) fetchData();
    }, [items]);

    // Clean up blob URLs
    useEffect(() => {
        return () => {
            Object.values(images).forEach((url) => URL.revokeObjectURL(url));
        };
    }, [images]);

    if (items.length === 0) {
        return (
            <div className="!pt-[10rem] flex justify-center text-[2rem] font-semibold text-indigo-950">
                No items in the cart
            </div>
        );
    }

    return (
        <section>
            <div>
                <div className="cols flex justify-between bg-fuchsia-400 h-10 text-[1.4rem] text-white !px-4">
                    <div>Products</div>
                    <div className="md:!pl-[40%]">Quantity</div>
                    <div>SubTotal</div>
                </div>
                <div className="flex flex-col gap-2 !px-4">
                    {items.map((item) => (
                        <Item
                            key={item.cartId}
                            cartId={item.cartId}
                            productId={item.productId}
                            quantity={item.quantity}
                            product={products[item.cartId]}
                            image={images[item.cartId]}
                        />
                    ))}
                    <br />
                    <br />
                </div>
            </div>
            <div className="border-t-4 border-fuchsia-400">
                 <br />
                <div className="grid grid-cols-2 gap-2 mt-4 text-[1.2rem] font-semibold">
                    <p>subtotal</p>
                    <p>{(total).toFixed(2)}</p>
                    <p>{"discount (12%)"}</p>
                    <p>{(total*0.12).toFixed(2)}</p>
                    <p className="font-bold text-2xl">Total</p>
                    <p className="font-bold  text-2xl">{(total*0.88).toFixed(2)}</p>
                </div>
                <br />
                <br />
            </div>
        </section>
    );
}

function Item({ cartId, productId, quantity, product, image }) {
    const [qty, setQty] = useState(quantity);

    const submitQuantityChange = (e) => {
        e.preventDefault();
        if (qty <= 0) return alert("Quantity must be greater than 0");

        axios
            .put(
                `${import.meta.env.VITE_BACK_END}/cart/update/${cartId}?quantity=${qty}`,
                { quantity: qty },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            )
            .then((res) => {
                if (res.status === 200) alert("Quantity updated successfully");
                else alert("Failed to update quantity");
            })
            .catch((err) => {
                console.error("Error updating quantity:", err);
                alert("Error updating quantity");
            });
    };

    if (!product) return null;

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
    );
}

export default Cart;
