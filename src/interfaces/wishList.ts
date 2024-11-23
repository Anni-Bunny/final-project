export interface wishListItem {
    image: string,
    name: string,
    price: number,
    stock: number,
    productId: number,
    size: string,
    color: string,
    sku: string
}

export interface wishList {
    userId: number | string,
    products: wishListItem[]
}