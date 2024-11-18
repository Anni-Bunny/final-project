import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Homepage} from "./pages/Homepage";
import {Product} from "./pages/Product";
import {Products} from "./pages/Products";
import ScrollToTop from "./components/ScrollToTop";

function App(){
    return (
        <div>
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/products/:id" element={<Product/>}/>
                <Route path="/products" element={<Products/>}/>
            </Routes>
        </div>
    );
}


export default App;

