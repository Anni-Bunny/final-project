import {cartItem} from "./cart";
import {address} from "./user"

export interface order {
    id: string | number,
    status: string,
    createdAt: string,
    products: cartItem[],
    address: address
}