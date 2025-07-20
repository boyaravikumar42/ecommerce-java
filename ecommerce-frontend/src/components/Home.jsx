import Cards from "./Cards";
import { Link } from "react-router-dom";
function Home()
{
    return (
       <section className="flex flex-nowrap flex-col-reverse  w-full justify-center items-center  gap-[5rem] md:flex-row md:pt-2.5" style={{background:"rgba(210,115,190,0.6)"}} >
         <div>
            <h2 className=" font-bold text-[3.2rem] md:text-[4rem] text-indigo-950 shadow-fuchsia-800  text-shadow-lg">Welcome To <span className="text-fuchsia-900">B</span>yte <span className="text-fuchsia-900">B</span>azaar</h2>
            <p className="text-black text-2xl shadow-fuchsia-800  text-shadow-lg" style={{marginTop:"3rem"}}>Discover a seamless shopping experience with Byte Bazaar, where quality meets convenience. Whether you're looking for the latest fashion trends, must-have electronics, stylish home décor, or daily essentials  it all under one roof.Start exploring now and elevate your shopping journey with just a few clicks!

 </p>
            
            <Link to="/products" className="btn  shadow-2xl shadow-fuchsia-300" style={{marginTop:"1.5rem"}}>Explore Now  <i className="fa-solid fa-arrow-right"></i> </Link>
        </div>
        <div className="md:w-[70vw] w-[90vw] h-[60vh]">
            <img src="./home.jpg" alt="home" className="w-[100%] h-[100%] "/>
        </div>
       </section>
    )
}
export default Home;