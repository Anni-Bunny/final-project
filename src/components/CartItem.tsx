import {cartItem} from "../interfaces/cart";
import {Button} from "./Button";
import React from "react";
import {decrementProduct, incrementProduct} from "../store/slices/cartSlice";
import {useDispatch} from "react-redux";

interface cartItemProps {
    product: cartItem
}

export function CartItem({product}: cartItemProps) {

    const dispatch = useDispatch()

    const sumPrice = product.price * product.quantity

    return (
        <div className="flex gap-4 h-30 border-b border-[#E9E9EB] pb-8">
            <div className="flex bg-gray-300 items-center">
                <img className=" w-20 bg-cover" src={product.image} alt=""/>
            </div>

            <div className="flex flex-col justify-between">
                <div className="flex gap-4">
                    <p className="max-w-44 overflow-hidden font-semibold">{product.name}</p>
                    <div className="flex-col">
                        <span className="flex items-center gap-1 justify-center">
                            <p>Color - </p>
                            <div className={`bg-${product.color}-200 rounded-full w-3 h-3`}></div>
                        </span>
                        <span className="flex">
                            <p>Size - </p>
                            <span className="font-semibold"> {product.size} </span>
                        </span>
                    </div>

                </div>

                <div className="flex justify-between items-center">
                    <div
                        className="h-10 min-w-10 w-28 flex items-center justify-between border border-[#E6E7E8] px-4 ">
                        <Button icon={"minus"} name={"minus"} type={"QuantityBtn"}
                                onClick={() => dispatch(decrementProduct(product.sku))}/>

                        <h3 className="text-sm text-[#202533]">{product.quantity}</h3>

                        <Button icon={"add"} name={"plus"} type={"QuantityBtn"}
                                onClick={() => dispatch(incrementProduct(product.sku))}/>
                    </div>

                    <span className="font-bold"> {product.price > 0 ? `$${product.price}.00` :
                        <span>`$${product.price}`</span>}</span>

                    <span className="font-bold"> {sumPrice > 0 ? `$${sumPrice}.00` :
                        <span>`$${product.price}`</span>}</span>
                </div>

            </div>
        </div>
    );
}