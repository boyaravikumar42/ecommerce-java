import { useEffect, useState } from "react";
import "./Cards.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Cards() {
    const [products, setProducts] = useState([]);            // ✅ local state
    const [imageUrls, setImageUrls] = useState({});          // { productId: imageUrl }
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Handle search
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        axios.get(`http://localhost:8080/products/search/${value}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error searching products:", error);
                setError("Error fetching search results");
                setLoading(false);
            });
    };

    // Fetch products on initial load
    useEffect(() => {
        axios.get("http://localhost:8080/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setError("Error fetching search results");
                setLoading(false);
            });
    }, []);

    // Fetch images for all products
    useEffect(() => {
        setLoading(true);
        products.forEach((product) => {
            if (!imageUrls[product.id]) {
                axios.get(`http://localhost:8080/products/img/${product.id}`, { responseType: "blob" })
                    .then((response) => {
                        const url = URL.createObjectURL(response.data);
                        console.log(`Image URL for product ${product.id}:`, url);
                        
                        setImageUrls( ({ ...imageUrls, [product.id]: url }));
                    })
                    .catch((error) => {
                        console.error("Error fetching image:", error);
                        setError("Error fetching search results");
                        setLoading(false);
                    });
            }
            setLoading(false);
        });
    }, [products]);

    // Show "No products" if list is empty
    if(loading) {
        return (
            <section>
                <h1 className="pt-4 m-auto text-center text-[1.5rem]">Loading...</h1>
            </section>  
        );
    }
    if (error) {
        return (
            <section>
                <h1 className="pt-4 m-auto text-center text-[2rem] text-red-600 font-semibold">Error: {error}</h1>
            </section>
        );
    }

    if (!products || products.length === 0) {
        return (
            <section>
                <h1 className="pt-4 m-auto text-center">No products are Available...</h1>
            </section>
        );
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
                    id="search"
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
                        img={imageUrls[product.id]} // fallback image
                        price={product.price}
                        descr={product.description}
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
        <Link to={`/products/${id}`}>
            <div className="card-wrapper">
                <img src={img} alt={name} className="w-[100%] h-[60%]" />
                <div>
                    <h2 className="text-[2rem]">{name}</h2>
                </div>
                <div className="price text-[1.6rem]">${price}</div>
                <p className="text-center text-[1.2rem] mb-2 text-gray-600">{descr}</p>
                <br />
                <button className="btn w-[80%] py-4 hover:bg-amber-100" disabled={!available}>
                    {available ? "Buy" : "Out Of Stock"}
                </button>
                <div
                    className="bg-purple-500 absolute h-[2rem] right-3 px-4 text-center rounded-full overflow-hidden text-white"
                    style={{ marginTop: "7px" }}
                >
                    {quantity}
                </div>
            </div>
        </Link>
    );
}
