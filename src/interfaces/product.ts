import {category} from "./category";

interface sizeStock {
    [size: string]: number; // Allows for any size as a key with a number value
}

interface colorStock {
    [color: string]: sizeStock; // Allows for any color as a key with SizeStock as value
}

interface imageColor {
    [color: string]: string[];
}

export interface product {
    id: number,
    sku: string,
    name: string,
    price: number,
    description: string,
    images: imageColor,
    stock: colorStock,
    category: category,
    score: number,
    createdAt: string
}
