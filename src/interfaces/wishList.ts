export interface wishListItem {
    image: string,
    name: string,
    price: number,
    productId: number,
    sku: string
    addedAt: string,
}

export interface wishList {
    id: number | string,
    userId: number | string,
    products: wishListItem[]
}