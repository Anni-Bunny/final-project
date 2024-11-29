import {order} from "../interfaces/order";
import React from "react";
import {Link} from "react-router-dom";

interface orderedItemProps {
    order: order,
}

export function Order({order}: orderedItemProps) {
    let totalPrice = 0;

    order.products.map((product) => (
        totalPrice += product.price
    ))

    return (
        <div className="flex justify-between items-center py-8 border-b last:border-none">

            <div className="flex items-start gap-3 max-w-72 overflow-x-auto">
                {
                    order.products.map((product, index) => (
                        <Link  key={index} to={`/products/${product.productId}`}>
                            <img className="max-w-20 rounded-full" src={product.image}
                                   alt=""/>
                        </Link>
                    ))
                }
            </div>

            <div className="flex flex-col gap-4 items-end justify-between">

                <div className="flex items-center gap-1 justify-center">
                    <p className="font-semibold">Ordered on: </p>
                    <span> {order.createdAt} </span>
                </div>

                <div className="flex gap-4">
                    <span className="font-semibold"> {`$${totalPrice}.00`} </span>
                    <p className={`border-b-2 ${order.status === "Completed" ? 'border-[#057234]' : 'border-b-[#0E1422]'} `}>{order.status}</p>
                </div>
            </div>

        </div>
    );
}