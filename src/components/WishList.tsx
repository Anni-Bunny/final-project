import React from "react";
import {Link} from "react-router-dom";
import {Button} from "./Button";
import {WishListItem} from "./WishListItem";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {wishList} from "../interfaces/wishList";

export function WishList() {
    const wishList = useSelector((state: RootState) => state.wishList)

    return (
        <div className="flex flex-col gap-4">
            {
                wishList && wishList.products?.length > 0 ? (
                    wishList.products.map((order, index) => (
                        <WishListItem key={index} product={order} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center gap-8">
                        <img src="/images/emptyOrders.png" alt="Description"/>
                        <p className="text-sm text-[#5C5F6A]">Your wishlist history is waiting to be filled.</p>
                        <Link to="/products"><Button title="Start Shopping" icon="arrowRight"/></Link>
                    </div>
                )
            }
        </div>
    );
}