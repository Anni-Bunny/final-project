import {BreadCrumb} from "../components/BreadCrumb";
import React, {useEffect, useState} from "react";
import {Container} from "../components/Container";
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from "../store/store";
import {Button} from "../components/Button"
import {Link, useNavigate} from "react-router-dom";
import {Input} from "../components/Input";
import api from "../classes/API";
import {order} from "../interfaces/order";
import moment from "moment";
import {clearAndUpdateDb, clearCart} from "../store/slices/cartSlice";

interface inputInfo {
    street: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
    firstname: string,
    lastname: string
}

export function CeckOut() {

    const navigate = useNavigate()
    const cart = useSelector((state: RootState) => state.cart)
    const user = useSelector((state: RootState) => state.user.data)
    const dispatch = useDispatch()

    const tax = 3

    const [newAddress, setNewAddress] = useState<inputInfo>({
        street: user?.address?.street || "",
        city: user?.address?.city || "",
        state: user?.address?.state || "",
        zipcode: user?.address?.zipcode || "",
        country: user?.address?.country || "",
        firstname: user?.name?.firstname || " ",
        lastname: user?.name?.lastname || ""
    });


    function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.currentTarget.value
        const name = event.currentTarget.name

        setNewAddress((state) => ({
            ...state,
            [name]: val
        }))
    }

    async function placeOrder(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (user?.id) {
            const order: order = {
                userId: user.id,
                status: "processing",
                tax: tax,
                createdAt: moment().format("YYYY-MM-DD"),
                products: cart.products.map(item => {
                    return {
                        image: item.image,
                        name: item.name,
                        price: item.price,
                        productId: item.productId,
                        size: item.size,
                        color: item.color,
                        quantity: item.quantity,
                        sku: item.sku
                    }
                }),
                address: newAddress
            }

            const response = await api.postOrder(order)

            if (response) {
                dispatch(clearAndUpdateDb())
                navigate('/afterPayment')
            }

        }
    }

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
                <form onSubmit={placeOrder} className="mt-14 mb-32 flex justify-between w-full">
                    <div className="w-3/5 pr-40">
                        <h5 className="text-[#0E1422] font-semibold text-lg py-4 mb-16">Shipping Address</h5>

                        <div className="flex flex-col gap-4">
                            <Input value={newAddress.street} onChange={onChangeInput} name={"street"} inputType={"text"}
                                   label={"Street Address"} inputClassName={"w-full"}
                                   placeholder={"Enter Your Street Address"}/>

                            <div className="grid grid-cols-2 gap-4  ">
                                <Input value={newAddress.city} onChange={onChangeInput} name={"city"} inputType={"text"}
                                       inputClassName={"w-full"} label={"City"} placeholder={"Enter Your City"}/>
                                <Input value={newAddress.state} onChange={onChangeInput} name={"state"}
                                       inputType={"text"}
                                       inputClassName={"w-full"} label={"State"} placeholder={"Enter Your State"}/>
                                <Input value={newAddress.zipcode} onChange={onChangeInput} name={"zipcode"}
                                       inputType={"text"}
                                       inputClassName={"w-full"} label={"Zip Code"} placeholder={"Enter Zip Code"}/>
                                <Input value={newAddress.country} onChange={onChangeInput} name={"country"}
                                       inputType={"text"}
                                       inputClassName={"w-full"} label={"Country"}
                                       placeholder={"Enter Your Country"}/>
                                <Input value={newAddress.firstname} onChange={onChangeInput} name={"firstname"}
                                       inputType={"text"}
                                       inputClassName={"w-full"} label={"First name"}
                                       placeholder={"Enter Your First name"}/>
                                <Input value={newAddress.lastname} onChange={onChangeInput} name={"lastname"}
                                       inputType={"text"}
                                       inputClassName={"w-full"} label={"Last name"}
                                       placeholder={"Enter Your Last name"}/>
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
                            <span>${tax}</span>
                        </div>
                        <div className="flex justify-between py-4 border-t border-[#E6E7E8]">
                            <span>Total</span>
                            <span>{`$${totalPrice + tax}`}</span>
                        </div>

                        <Button title={"Checkout"} className={"w-full " + (!cart.products.length ? 'hidden' : '')}/>

                    </div>

                </form>
            </Container>

        </div>

    );
}