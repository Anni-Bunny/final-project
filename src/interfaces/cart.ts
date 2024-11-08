interface cartItem{
    productId: number,
    size: string,
    color: string,
    quantity: number
}

export interface cart{
    id: number,
    userId: number,
    products:cartItem[]
}