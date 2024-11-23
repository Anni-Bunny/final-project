import React, {useEffect, useState} from "react";
import api from "../classes/API";
import {Link} from "react-router-dom";
import {Button} from "./Button";
import {WishListItem} from "./WishListItem";
import {wishList} from "../interfaces/wishList";

export function WishList() {
    const [wishList, setWishList] = useState<wishList>();

    useEffect(() => {
        async function fetchOrders() {
            const reviewsRequest = await api.getWishList({userId: 1});
            if (reviewsRequest) {
                setWishList(reviewsRequest[0]);
            }
        }
        fetchOrders();
    }, []);

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