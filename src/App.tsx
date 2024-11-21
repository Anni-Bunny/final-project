import React from 'react';
import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom';
import {Homepage} from "./pages/Homepage";
import {Product} from "./pages/Product";
import {Products} from "./pages/Products";
import ScrollToTop from "./components/ScrollToTop";
import {ShoppingCart} from "./pages/ShoppingCart";
import {NotificationBar} from "./components/NotificationBar";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";

const nonNewsLetterPages = ['/shoppingCart']

function App(){

    const currentPage = useLocation()
    const displayNewsLetter = ! nonNewsLetterPages.includes(currentPage.pathname)
    return (
        <div>
            <NotificationBar/>
            <Header/>
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/products/:id" element={<Product/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/shoppingCart" element={<ShoppingCart/>}/>
            </Routes>
            <Footer displayNewsLetter={displayNewsLetter}/>
        </div>
    );
}


export default App;

