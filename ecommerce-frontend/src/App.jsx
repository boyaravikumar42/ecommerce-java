import { useState } from 'react'
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import AddProduct from './components/AddProduct';
import Home from './components/Home';
import { Router, Routes, Route } from 'react-router-dom';
import Cart from './components/cart';
import Notfound from './components/Notfound';
import UpdateProduct from './components/UpdateProduct';
import Login from './components/Login';
import Register from './components/Register';
import { LoginContextProvider } from './context/LoginContext';
import Profile from './components/Profile'
import ProductDetail from './components/ProductDetail';
import ForgotPassword from './components/ForgotPassword';
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
        <Route path='/logout' element={<Profile/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/updateproduct/:id" element={<UpdateProduct/>}/>
        <Route path="/productdetails/:prodId" element={<ProductDetail/>} />
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </>
    </LoginContextProvider>
  
    
  )
}

export default App
