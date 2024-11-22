import {BreadCrumb} from "../components/BreadCrumb";
import React from "react";
import {Container} from "../components/Container";
import { useSelector, useDispatch } from 'react-redux'
import {RootState} from "../store/store";
import {CartItem} from "../components/CartItem";
import {Button} from "../components/Button"
import {Link} from "react-router-dom";

export function ShoppingCart() {

    const cart = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.products.forEach((product) => {
        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;
    });
    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "Products",
            url: "/products"
        }
    ]

    return (
        <div>
            <section className="bg-[#F6F6F6] py-8">
                <Container>
                    <div className="flex flex-col gap-2 p-3">
                        <h3 className="text-2xl font-bold text-[#0E1422]">Cart</h3>
                        <BreadCrumb containerClassName="mx-0" className=" my-0 px-0 py-0 " links={links}/>
                    </div>
                </Container>
            </section>

            <Container>
                <div className="py-14 flex justify-between w-full">
                    <div>
                        <h5 className="text-[#0E1422] font-semibold text-lg py-4">Your cart</h5>
                        <div className="border-t border-[#E9E9EB] flex flex-col gap-10 py-12">
                            {
                                Array.isArray(cart.products) && cart.products.length > 0 ? (
                                    cart.products.map((product) => (
                                        <CartItem type={"horizontal"} key={product.productId} product={product} />
                                    ))
                                ) : (
                                    <h3 className="flex items-center justify-center pt-10 font-bold text-xl">Cart is empty</h3>
                                )
                            }
                        </div>
                    </div>


                    {
                        Array.isArray(cart.products) && cart.products.length > 0 &&
                        <div className="max-w-96 w-full max-h-[27rem] border border-[#E6E7E8] mt-10 py-8 px-6 flex flex-col gap-6">
                            <h5 className="font-semibold text-lg mb-5">Order Summary</h5>
                            <div className="flex justify-between">
                                <span className="text-[#5C5F6A]">Shipping:</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-[#5C5F6A]">Tax:</span>
                                <span>$3.00</span>
                            </div>
                            <div className="flex justify-between py-4 border-t border-[#E6E7E8]">
                                <span>Total</span>
                                <span>{`$${totalPrice+3}.00`}</span>
                            </div>

                            <Link to={"/checkout"}><Button title={"Checkout"} className="w-full"/></Link>

                            <Link to={"/products"} className="flex justify-center"><span className="border-b text-sm">Continue Shopping</span></Link>

                        </div>
                    }

                </div>
            </Container>

        </div>
    );
}