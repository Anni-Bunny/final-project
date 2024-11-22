import {order} from "../interfaces/order";
import React from "react";
import {Button} from "./Button";

interface orderedItemProps {
    order: order["userId"],
}

export function WishListItem({order}: orderedItemProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <img className="bg-cover w-28" src={order.image} alt=""/>
                <div className="flex flex-col gap-4">
                    <p className="max-w-44 overflow-hidden font-semibold">{order.name}</p>
                    <div className="flex items-center gap-1 justify-center">
                        <p>Ordered on: - </p>
                        <span className="font-semibold"> {order.orderedOn} </span>
                    </div>
                    <Button title={"Remove item"} type={"whiteSmallBtn"}/>

                </div>
            </div>

            <div className="flex justify-between items-center gap-10">
                <div className="flex">
                    <span className="font-semibold"> {`$${order.price}.00`} </span>
                </div>
                <Button title={"View item"} type={"whiteBtn"}/>
            </div>
        </div>
    );
}