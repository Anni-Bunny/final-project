import {address} from "./user"

export interface orderItem {
    image: string,
    name: string,
    price: number,
    productId: number,
    size: string,
    color: string,
    quantity: number,
    sku: string
}

export interface order {
    id?: string | number,
    userId: string | number,
    tax: string | number,
    status: string,
    createdAt: string,
    products: orderItem[],
    address: address
}