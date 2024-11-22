interface orderDetails{
    productId: string,
    sku: string,
    name: string,
    price: number,
    image: string,
    orderedOn: string,
    status: string
}

export interface order {
    userId: orderDetails
}