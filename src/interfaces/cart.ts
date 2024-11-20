export interface cartItem {
    productId: number,
    size: string,
    color: string,
    quantity: number
}

export interface cart {
    id: number | string,
    userId: number | string,
    products: cartItem[]
}