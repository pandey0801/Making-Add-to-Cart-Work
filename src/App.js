
import './App.css';
import { useState } from 'react';
import Home from './component/Home';
import Store from './component/Store';
import About from './component/About';
import CartMain from './cart/CartMain';
import { Context } from './store/Context';

function App() {

  const [activeSection, setActiveSection] = useState('home');
  const [showCart, setShowCart] = useState(false); // State to manage cart visibility

  // Function to handle section click
  const handleSectionClick = (section) => {
    if (section === 'cart') {
      setShowCart(true); // Show cart when clicking on 'cart'
    } else {
      setActiveSection(section);
    }
  };

  // Function to close the cart
  const handleCloseCart = () => {
    setShowCart(false);
  };


  const [cartItem, setCartItem] = useState([]);
  const [totalItem, setTotalItem] = useState(0);

  const addCart = (itemname, itemprice)=>
    {
      // console.log(itemname, itemprice);
      const newItem = [...cartItem, {name:itemname, price:itemprice}]
      setCartItem(newItem);


      const count = newItem.reduce((acc, item) => acc + item.price, 0).toFixed(2);
      setTotalItem(count);
    }

    const removeCart = (itemname)=>
      {
        const delItem = cartItem.filter((item)=> item.name!==itemname)
        setCartItem(delItem);

        const count = delItem.reduce((acc, item) => acc + item.price, 0).toFixed(2);
        setTotalItem(count);
      }

          // console.log("total",totalItem);
  return (
  
    <Context.Provider value={{cartItem, totalItem, addCart, removeCart}}>
    <div>

    {/* Navbar */}

    <nav className="p-3 flex bg-black justify-center items-center">

      <div className={`flex-none w-20 h-7 `}>
        <a href="#" onClick={() => handleSectionClick('home')} className="text-white h-2">
          Home
        </a>
      </div>
      <div className={`flex-none w-20 h-7 `}>
        <a href="#" onClick={() => handleSectionClick('store')} className="text-white">
          Store
        </a>
      </div>
      <div className={`flex-none w-20 h-7 `}>
        <a href="#" onClick={() => handleSectionClick('about')} className="text-white">
          About
        </a>
      </div>

      <div className='text-white text-base w-20 h-7 flex items-end'>
        <button className='border border-blue-500 px-4' onClick={()=> handleSectionClick('cart')}>Cart</button>
      </div>
    </nav>

    {/* Content */}
    
    {activeSection === 'home' && <Home/>}      
    {activeSection === 'store' && <Store/>}     
    {activeSection === 'about' && <About/>}
    
    {/* Cart Section */}
    {showCart && (<CartMain   closeCart={handleCloseCart}/>)}
    </div>
    </Context.Provider>

  );
}

export default App;

