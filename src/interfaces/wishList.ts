export interface wishListItem {
    image: string,
    name: string,
    price: number,
    stock: number,
    productId: number,
    size: string,
    color: string,
    sku: string
    addedAt: string,
}

export interface wishList {
    id: number | string,
    userId: number | string,
    products: wishListItem[]
}