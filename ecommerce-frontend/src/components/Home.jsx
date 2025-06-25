import Cards from "./Cards";
import { Link } from "react-router-dom";
function Home()
{
    return (
       <section className="flex flex-nowrap flex-col-reverse  w-full justify-center items-center  gap-[5rem] bg-fuchsia-300 md:flex-row md:pt-2.5" >
         <div>
            <h2 className=" font-bold text-[3.2rem]">Welcome To Ravi's Store</h2>
            <p className="text-black text-2xl" style={{marginTop:"3rem"}}>Lorem ipsum dolor sit ametiente! Explicabo, aut ut assumenda qgiat ducimus, nisi porro quidem eligendi tenetur minus minima velit totam nam delectus officiis iusto error tempore laudantium vitae. Sequi, quae! </p>
            
            <Link to="/products" className="btn" style={{marginTop:"1.5rem"}}>Explore Now </Link>
        </div>
        <div className="w-[65vw] h-[60vh]">
            <img src="./hero.png" alt="home" className="w-[100%] h-[100%] z-600 shadow-2xl shadow-fuchsia-700"/>
        </div>
       </section>
    )
}
export default Home;