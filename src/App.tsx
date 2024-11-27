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
import {CeckOut} from "./pages/Checkout";
import {AfterPayment} from "./pages/AfterPayment";
import {Login} from "./pages/Login";
import {SignUp} from "./pages/SignUp";
import {ForgotPassword} from "./pages/ForgotPassword";
import {ResetPassword} from "./pages/ResetPassword";
import {Profile} from "./pages/Profile";

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
                <Route path="/checkout" element={<CeckOut/>}/>
                <Route path="/afterPayment" element={<AfterPayment/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/forgotPassword" element={<ForgotPassword/>}/>
                <Route path="/resetPassword/:id" element={<ResetPassword/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
            <Footer displayNewsLetter={displayNewsLetter}/>
        </div>
    );
}


export default App;

