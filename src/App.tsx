import React from 'react';
import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom';
import {Homepage} from "./pages/Homepage";
import {Product} from "./pages/Product";
import {Products} from "./pages/Products";
import {ShoppingCart} from "./pages/ShoppingCart";
import {CeckOut} from "./pages/Checkout";
import {AfterPayment} from "./pages/AfterPayment";
import {Login} from "./pages/Login";
import {SignUp} from "./pages/SignUp";
import {ForgotPassword} from "./pages/ForgotPassword";
import {ResetPassword} from "./pages/ResetPassword";
import {Profile} from "./pages/Profile";
import {AdminLogin} from "./pages/AdminLogin";
import {AdminDashboard} from "./pages/AdminDashboard";
import {AdminProducts} from "./pages/AdminProducts";
import {AdminOrders} from "./pages/AdminOrders";
import {AdminCustomers} from "./pages/AdminCustomers";
import {AdminReviews} from "./pages/AdminReviews";
import {AdminSettings} from "./pages/AdminSettings";
import { MainLayout } from "./layouts/MainLayout"
import {AdminLayout} from './layouts/AdminLayout';
import {About} from "./pages/About";


function App(){
    return (
        <div>
            <Routes>
                {/* Regular Routes with MainLayout */}
                <Route path="/" element={<MainLayout><Homepage /></MainLayout>} />
                <Route path="/products/:id" element={<MainLayout><Product /></MainLayout>} />
                <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
                <Route path="/shoppingCart" element={<MainLayout><ShoppingCart /></MainLayout>} />
                <Route path="/checkout" element={<MainLayout><CeckOut /></MainLayout>} />
                <Route path="/afterPayment" element={<MainLayout><AfterPayment /></MainLayout>} />
                <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
                <Route path="/signup" element={<MainLayout><SignUp /></MainLayout>} />
                <Route path="/forgotPassword" element={<MainLayout><ForgotPassword /></MainLayout>} />
                <Route path="/resetPassword/:id" element={<MainLayout><ResetPassword /></MainLayout>} />
                <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
                <Route path="/about" element={<About />}/>

                {/* Admin Routes with AdminLayout */}
                <Route path="/admin/login" element={<AdminLayout><AdminLogin /></AdminLayout>} />
                <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
                <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
                <Route path="/admin/customers" element={<AdminLayout><AdminCustomers /></AdminLayout>} />
                <Route path="/admin/reviews" element={<AdminLayout><AdminReviews /></AdminLayout>} />
                <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

            </Routes>
        </div>
    );
}


export default App;

