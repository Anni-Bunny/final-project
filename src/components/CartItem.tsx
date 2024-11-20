import {cartItem} from "../interfaces/cart";
import {Button} from "./Button";
import React from "react";

interface cartItemProps {
    product: cartItem
}

export function CartItem({product}: cartItemProps) {

    function changeProductQuantity(event: React.MouseEvent<HTMLButtonElement>) {
        if (event.currentTarget.name === "minus" && product.quantity > 0) {
           product.quantity --
        } else if (product && product.color && product.size &&
            event.currentTarget.name === "plus" && product.quantity < product.stock) {
            product.quantity++
        }
    }
    return (
        <>
            <div>
                {product.image}
            </div>

            <div>
                <p>{product.name}</p>
                <span>
                    Color: <div className={`bg-${product.color}-200 rounded-full w-3 h-3`}></div>
                    - size : {product.size}
                </span>
            </div>

            <div>
                {
                    product.price > 0 ? `$${product.price}.00` : <span>`$${product.price}`</span>
                }

                <div
                    className="h-11 min-w-10 w-40 flex items-center justify-between border border-[#E6E7E8] px-4 ">
                    <Button icon={"minus"} name={"minus"} type={"QuantityBtn"}
                            onClick={changeProductQuantity}/>
                    <h3 className="text-sm text-[#202533]">{product.quantity}</h3>
                    <Button icon={"add"} name={"plus"} type={"QuantityBtn"}
                            onClick={changeProductQuantity}/>
                </div>
            </div>
        </>
    );
}