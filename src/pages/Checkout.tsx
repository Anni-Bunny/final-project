import {BreadCrumb} from "../components/BreadCrumb";
import React from "react";
import {Container} from "../components/Container";
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from "../store/store";
import {Button} from "../components/Button"
import {Link} from "react-router-dom";
import {Input} from "../components/Input";

export function CeckOut() {

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
            name: "Checkout",
            url: ""
        }
    ]

    return (
        <div>
            <section className="bg-[#F6F6F6] py-8">
                <Container>
                    <div className="flex flex-col gap-2 p-3">
                        <h3 className="text-2xl font-bold text-[#0E1422]">Checkout</h3>
                        <BreadCrumb containerClassName="ml-0" links={links}/>
                    </div>
                </Container>
            </section>

            <Container>
                <div className="mt-14 mb-32 flex justify-between w-full">
                    <div className="w-3/5 pr-40">
                        <h5 className="text-[#0E1422] font-semibold text-lg py-4 mb-16">Shipping Address</h5>

                        <div className="flex flex-col gap-4">
                            <Input inputType={"text"} label={"Street Address"} inputClassName={"w-full"} placeholder={"Enter Your Street Address"}/>

                            <div className="grid grid-cols-2 gap-4  ">
                                <Input inputType={"text"} inputClassName={"w-full"} label={"City"} placeholder={"Enter Your City"}/>
                                <Input inputType={"text"} inputClassName={"w-full"} label={"State"} placeholder={"Enter Your State"}/>
                                <Input inputType={"text"} inputClassName={"w-full"} label={"Zip Code"} placeholder={"Enter Zip Code"}/>
                                <Input inputType={"text"} inputClassName={"w-full"} label={"Country"} placeholder={"Enter Your Country"}/>
                                <Input inputType={"email"} inputClassName={"w-full"} label={"Email"} placeholder={"Enter Your Email"}/>
                                <Input inputType={"text"} inputClassName={"w-full"} label={"Full name"} placeholder={"Enter Your Full name"}/>
                            </div>
                        </div>
                    </div>


                    <div
                        className=" w-2/5 border-l border-[#E6E7E8] px-16 flex flex-col gap-6">

                        <h5 className="font-semibold text-lg mb-8">Your Order</h5>

                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-start gap-1 max-w-72 overflow-x-auto">
                                {
                                    cart.products.map((product) => (
                                        <img className="max-w-14 rounded-full" key={product.sku} src={product.image}
                                             alt=""/>
                                    ))
                                }
                            </div>

                            <Link to={"/shoppingCart"}>
                                <Button title="Edit Cart" type={"whiteBtn"}/>
                            </Link>
                        </div>


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
                            <span>{`$${totalPrice + 3}.00`}</span>
                        </div>

                        <Link to={"/afterPayment"}><Button title={"Checkout"} className="w-full"/></Link>

                        <Link to={"/products"} className="flex justify-center"><span className="border-b text-sm">Continue Shopping</span></Link>

                    </div>


                </div>
            </Container>

        </div>
    );
}