import {product} from "../interfaces/product";

interface StockParams {
    product: product,
    className?: string
}

export function Stock({product, className}: StockParams) {
    return (
        <span
            className={`border rounded-full py-0.5 px-4 text-sm block w-[6.25rem] ${(product.stock) ? "text-[#0E1422]" : "text-[#E6E7E8]"} ${className}`}>
            {
                (product.stock) ? "IN STOCK" : "OUT OF STOCK"
            }
        </span>
    );
}