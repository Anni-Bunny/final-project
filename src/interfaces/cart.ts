
export interface cartItem {
    image: string,
    name: string,
    price: number,
    stock: number,
    productId: number,
    size: string,
    color: string,
    quantity: number,
    sku: string
}

export interface cart {
    id: number | string,
    userId: number | string,
    products: cartItem[]
}