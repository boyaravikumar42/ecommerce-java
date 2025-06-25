import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import AddProduct from './components/AddProduct';
import Home from './components/Home';
import { Router, Routes, Route } from 'react-router-dom';
import Cart from './components/cart';
import Notfound from './components/Notfound';
import ProdDesc from './components/ProdDesc';
import { ProductProvider } from './components/ProductContext';
import UpdateProduct from './components/UpdateProduct';
import Login from './components/Login';
import Register from './components/Register';
import { LoginContextProvider } from './context/LoginContext';
import LogOut from './components/LogOut'
function App() {
  const [count, setCount] = useState(0)

  return (
    <LoginContextProvider>
      <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/products" element={<Cards />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<LogOut/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/products/:id" element={<ProdDesc/>}/>
        <Route path="/updateproduct/:id" element={<UpdateProduct/>}/>
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </>
    </LoginContextProvider>
  )
}

export default App
