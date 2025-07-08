import { useEffect, useState } from "react";
import "./Cards.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Cards() {
    const [products, setProducts] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const[isSearch,setIsSearch]=useState(true);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if(value==="" && isSearch)
           {
             setIsSearch(false);
             return
           }
        else
            setIsSearch(true);

        axios.get(`${import.meta.env.VITE_BACK_END}/products/search/${value}`,
            {headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}})
            .then((res) => {
                setProducts(res.data);
                setError(null);
            })
            .catch((err) => {
                console.error("Error for searching products:", err);
                setError("No items found");
            });
    };

    // Fetch products initially
    useEffect(() => {
    const fetchProducts = async () => { 
        // console.log("Fetching products...111", URL);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACK_END}/products/get`,{headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}});
            //  console.log("Products fetched:", response);
            setProducts(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching products:", error.message, error);
           
            setError("Error to the fetching products");
        }
        finally {
            setLoading(false); 
        }
    };

    fetchProducts();
}, [isSearch]);


    // Fetch images for products
    useEffect(() => {
        if (products.length === 0) return;

        const fetchImages = async () => {
            const newImages = { ...imageUrls };
            try {
                await Promise.all(
                    products.map(async (product) => {
                        if (!newImages[product.id]) {
                            const res = await axios.get(`${import.meta.env.VITE_BACK_END}/products/img/${product.id}`, {
                                responseType: "blob",
                                headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}
                                
                            });
                            // console.log("Image fetched for product:", product.id, res);
                            const url = URL.createObjectURL(res.data);
                            newImages[product.id] = url;
                        }
                    })
                );
                setImageUrls(newImages);
            } catch (err) {
                console.error("Error fetching images:", err.message, err);
                setError("Error: Error to loading product images");
            }
        };

        fetchImages();
    }, [products]);

    if (loading) {
        return <section><h1 className="pt-4 m-auto text-center text-[1.5rem]">Loading...</h1></section>;
    }

    if (error) {
        return <section><h1 className="pt-4 m-auto text-center text-[2rem] text-red-600 font-semibold"> {error}</h1></section>;
    }

    if (!products || products.length === 0) {
        return <section><h1 className="pt-4 m-auto text-center">No products are available...</h1></section>;
    }

    return (
        <section>
            <div className="w-full mt-5">
                <input
                    className="border-0 outline-0"
                    style={{
                        border: "2px solid violet",
                        width: "100%",
                        borderRadius: "10px",
                        height: "3.2rem",
                        padding: "2% 4%",
                        fontSize: "1.4rem",
                    }}
                    type="text"
                    name="search"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>
            <br />
            <div className="cards-container">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        img={imageUrls[product.id] || "/placeholder.png"}
                        price={product.price}
                        descr={product.descr}
                        quantity={product.quantity}
                        available={product.available}
                    />
                ))}
            </div>
        </section>
    );
}

export default Cards;

function Card({ id, name, img, price, descr, quantity, available }) {
    return (
        <Link to={`/productdetails/${id}`}>
            <div className="card-wrapper">
                <img src={img} alt={name} className="w-[100%] h-[60%] object-cover" />
                <div>
                    <h2 className="text-[2rem]">{price} /-</h2>
                </div>
                <div className="price text-[1.6rem]">{name}</div>
                <p className="text-center text-[1.2rem] mb-2 text-gray-600">{descr}</p>
                <br />
                
                <div className="absolute h-[2rem] right-3 px-4 text-center overflow-hidden " style={{ marginTop: "7px" }}>
                    <i className={`fa-solid ${available ? "fa-heart" : "fa-sun"} text-[1.2rem] ${available ? "text-green-500" : "text-red-500"}`}></i>
                </div>
            </div>
        </Link>
    );
}
