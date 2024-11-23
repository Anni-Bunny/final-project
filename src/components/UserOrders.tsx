import React, {useEffect, useState} from "react";
import api from "../classes/API";
import {order} from "../interfaces/order";
import {OrderedItem} from "./OrderedItem";

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
                orders &&
                orders.map((order, index) => (
                    <OrderedItem key={index} order={order}/>
                ))
            }
        </div>
    );
}