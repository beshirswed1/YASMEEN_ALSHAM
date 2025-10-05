// استدعاء الملفات الأساسية
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { FaShoppingCart } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

// Context للسلة
import { CartProvider } from "./contexts/CardContext.js";

// المكونات
import PillNav from "./components/PillNav/PillNav.jsx"; 
import ProductsPage from "./components/Components/pages/ProductsPage.jsx";
import logo from "./assets/flower-green-svgrepo-com.svg"; 
import LiquidChrome from "./components/Backgrounds/LiquidChrome/LiquidChrome.jsx";
import Switch from "./components/Components/Darligm.jsx";

// صفحات
import Home from "./components/Components/pages/Home";
import About from "./components/Components/pages/About";
import OffersPage from "./components/Components/pages/Services";
import Contact from "./components/Components/pages/Contact";
import Carousel from "./components/Carousel/Carousel.jsx";

// ================== App Component ==================
function App() {
     

  return (
    <BrowserRouter>
<MainApp/>
      </BrowserRouter>
    
  );
}
function MainApp() {
  const location = useLocation();
  return(
  <>
  
  
        {/* 🌌 خلفية أنيميشن */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -100 }}>
        <LiquidChrome
          baseColor={[0.2, 0.2, 0.6]}
          speed={0.11}
          amplitude={0.26}
          interactive={false}
        />
      </div>


    <div className={`fixed top-0 left-0 z-[9999] w-full bg-transparent shadow-md transition-transform duration-300`}>
      <div className="left-20">
        <Switch />
      </div>
      <div className="flex items-center justify-center">
        <PillNav
          logo={logo}
          logoAlt="Yasmin Store Logo"
          items={[
            { label: "الصفحه الرئيسيه", href: "/" },
            { label: "عن الموقع", href: "/about" },
            { label: "العروض", href: "/offerspage" },
            { label: "تواصل", href: "/contact" },
            { label: "المنتجات", href: "/products" },
            { label: <FaShoppingCart className="m-6 text-2xl"/>, href: "/#" },

          ]}
  className="custom-nav"
  ease="power3.inOut"
  baseColor="#000000"
  pillColor="#ffffff"
  hoveredPillTextColor="#ffffff"
  pillTextColor="#000000"
  activeHref={location.pathname.toLowerCase()}


        />
        
      </div>
    </div>





      
        {/* 📌 تحديد الصفحات */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/offersPage" element={<OffersPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
  
  
  </>)
}
export default App;
