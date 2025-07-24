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

        axios.get(`${import.meta.env.VITE_BACK_END}products/search/${value}`)
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
            const response = await axios.get(`${import.meta.env.VITE_BACK_END}products/get`);
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
                            const res = await axios.get(`${import.meta.env.VITE_BACK_END}products/img/${product.id}`, {
                                responseType: "blob",
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

   const filterByPriceRange = async (e) => {
  const [min, max] = e.target.value.split("-").map(Number);
  if (!min || !max) return;

  try {
    const res = await axios.get(`${import.meta.env.VITE_BACK_END}products/price?min=${min}&max=${max}`);
    setProducts(res.data);
    setError(null);
  } catch (err) {
    console.error("Error filtering by price:", err);
    setError("No items found in this price range");
  }
};

const filterByCategory = async (e) => {
  const value = e.target.value;
  if (!value) return;

  try {
    const res = await axios.get(`${import.meta.env.VITE_BACK_END}products/category?value=${value}`);
    setProducts(res.data);
    setError(null);
  } catch (err) {
    console.error("Error filtering by category:", err);
    setError("No items found in this category");
  }
};

    if (loading) {
        return <section><h1 className="pt-4 m-auto text-center text-[1.5rem]">Loading...</h1></section>;
    }

    if (error) {
        return <section><h1 className="pt-4 m-auto text-center text-[2rem] text-red-600 font-semibold"> {error}</h1></section>;
    }

    // if (!products || products.length === 0) {
    //     return ;
    // }

    return (
        <section>
            <div className="w-full mt-5 relative">
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
                    placeholder="Search products by name, cateogery and description... "
                    value={search}
                    onChange={handleSearch}
                />
                { 
                products.length === 0 && (
                   
                   <section><h1 className="pt-4 m-auto text-center text-2xl">No products are available...</h1></section>
                )
            }
                <label htmlFor="search"><i className="fas fa-search text-2xl font-semibold text-fuchsia-400 absolute right-5 top-4 md:text-3xl md:top-6 md:right-8"></i></label>

                <div className="flex justify-end gap-4 !mt-8 text-[1.2rem]">
                    <br />
                    <select
  name="price"
  id="pricefilter"
  className="text-white bg-fuchsia-400 rounded-lg outline-0"
  onChange={filterByPriceRange}
>
  <option value="">Filter by price</option>
  <option value="0-500">0 - 500</option>
  <option value="500-1000">500 - 1000</option>
  <option value="1000-5000">1000 - 5000</option>
  <option value="5000-10000">5000 - 10000</option>
  <option value="10000-50000">10000 - 50000</option>
  <option value="50000-1000000">above 50000</option>
</select>

<select
  name="category"
  id="cateogeryfilter"
  className="text-white bg-fuchsia-400 rounded-lg outline-0 !p-2"
  onChange={filterByCategory}
>
  <option value="">Filter by category</option>
  <option value="phones">phones</option>
  <option value="shoes">shoes</option>
  <option value="watches">watches</option>
  <option value="laptops">laptops</option>
  <option value="electronics">electronics</option>
  <option value="others">others</option>
</select>

                </div>
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
                <div className="price text-[1.6rem] !px-2 text-center">{name}</div>
                <p className="text-center text-[1.2rem] mb-2 text-gray-600 !px-[1rem]">{descr.substring(0,60)}...</p>
                <br />
                
                <div className="absolute h-[2rem] right-0 top-0  text-center overflow-hidden " style={{ marginTop: "7px" }}>
                    <p className={`text-md ${available?"bg-green-200":"bg-red-300 text-white"} rounded-sm !px-1 !py-1 `}>{ available?"available":"out of stock"}</p>
                </div>
            </div>
        </Link>
    );
}
