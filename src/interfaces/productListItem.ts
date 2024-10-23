interface SizeStock {
    [size: string]: number; // Allows for any size as a key with a number value
}

interface ColorStock {
    [color: string]: SizeStock; // Allows for any color as a key with SizeStock as value
}

interface imageColor {
    [color: string]: string[];
}


export interface productListItem {
    id: number,
    sku: string,
    name: string,
    price: number,
    description: string,
    images: imageColor,
    size: string,
    stock: ColorStock
}
