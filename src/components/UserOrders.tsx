import React, {useEffect, useState} from "react";
import api from "../classes/API";
import {order} from "../interfaces/order";
import {Order} from "./Order";
import {Link} from "react-router-dom";
import {Button} from "./Button";

export function UserOrders() {
    const [orders, setOrders] = useState<order[]>();

    useEffect(() => {
        async function fetchOrders() {
            const reviewsRequest = await api.getOrders({userId: 1});
            if (reviewsRequest) {
                setOrders(reviewsRequest);
            }
        }
        fetchOrders();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            {
                orders && orders.length > 0 ? (
                    orders.map((order, index) => (
                        <Order key={index} order={order} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center gap-8">
                        <img src="/images/emptyOrders.png" alt="Description"/>
                        <p className="text-sm text-[#5C5F6A]">Your order history is waiting to be filled.</p>
                        <Link to="/products"><Button title="Start Shopping" icon="arrowRight"/></Link>
                    </div>
                )
            }
        </div>
    );
}