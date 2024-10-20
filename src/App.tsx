import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Homepage} from "./pages/Homepage";
import {Product} from "./pages/Product";

function App(){
    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/product" element={<Product/>}/>

            </Routes>
        </div>
    );
}


export default App;

