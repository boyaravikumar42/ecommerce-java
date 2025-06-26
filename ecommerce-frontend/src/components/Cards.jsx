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

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        axios.get(`http://localhost:8080/products/search/${value}`)
            .then((res) => {
                setProducts(res.data);
                setError(null);
            })
            .catch((err) => {
                console.error("Error searching products:", err);
                setError("No items found");
            });
    };

    // Fetch products initially
    useEffect(() => {
        axios.get("http://localhost:8080/products")
            .then((res) => {
                setProducts(res.data);
                setError(null);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError(" Error: Error to fetching products");
            })
            .finally(() => setLoading(false));
    }, []);

    // Fetch images for products
    useEffect(() => {
        if (products.length === 0) return;

        const fetchImages = async () => {
            const newImages = { ...imageUrls };
            try {
                await Promise.all(
                    products.map(async (product) => {
                        if (!newImages[product.id]) {
                            const res = await axios.get(`http://localhost:8080/products/img/${product.id}`, {
                                responseType: "blob",
                            });
                            const url = URL.createObjectURL(res.data);
                            newImages[product.id] = url;
                        }
                    })
                );
                setImageUrls(newImages);
            } catch (err) {
                console.error("Error fetching images:", err);
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
        <Link to={`/products/${id}`}>
            <div className="card-wrapper">
                <img src={img} alt={name} className="w-[100%] h-[60%] object-cover" />
                <div>
                    <h2 className="text-[2rem]">{price} /-</h2>
                </div>
                <div className="price text-[1.6rem]">{name}</div>
                <p className="text-center text-[1.2rem] mb-2 text-gray-600">{descr}</p>
                <br />
                
                <div className="absolute h-[2rem] right-3 px-4 text-center rounded-full overflow-hidden text-white" style={{ marginTop: "7px" }}>
                    <i className={`fa-solid ${available ? "fa-check" : "fa-xmark"} text-[1.2rem] ${available ? "bg-green-500" : "bg-red-500"}`}></i>
                </div>
            </div>
        </Link>
    );
}
