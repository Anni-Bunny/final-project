import React from "react";
import {Button} from "./Button";
import {wishListItem} from "../interfaces/wishList";
import {Link} from "react-router-dom";

interface WishListItemProps {
    product: wishListItem,
}

export function WishListItem({product}: WishListItemProps) {
    return (
        <div className="flex items-center justify-between py-8 border-b last:border-none">
            <div className="flex items-center gap-8">

                <Link to={`/products/${product.productId}`}>
                    <img className="max-w-24" src={product.image}
                         alt=""/> </Link>

                <div className="flex flex-col gap-4 items-start">
                <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-center gap-1 justify-center text-[#717171] text-sm">
                        <p>Added on: </p>
                        <span className="font-semibold"> {product.addedAt} </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center gap-10">
                <span className="font-semibold"> {`$${product.price}.00`} </span>
                <Button title={"Remove item"} type={"whiteSmallBtn"} className="flex text-start"/>
                <Button title={"Add to cart"} type={"whiteBtn"}/>
            </div>
        </div>
    );
}