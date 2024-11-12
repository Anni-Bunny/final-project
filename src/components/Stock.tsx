import {product} from "../interfaces/product";

interface StockParams {
    product: product,
    className?: string
}

export function Stock({product, className}: StockParams) {
    let sizeFound = false;

    Object.keys(product.stock).forEach(color => {

        Object.keys(product.stock[color]).forEach(size => {
            if (product.stock[color][size] === 0) {
                sizeFound = true;
            }
        })

    });

    return (
        <span
            className={`border rounded-full py-0.5 px-4 text-sm w-[9rem] flex justify-center ${(product.stock) ? "text-[#0E1422]" : "text-[#E6E7E8]"} ${className}`}>
            {
                (sizeFound) ? "IN STOCK" : "OUT OF STOCK"
            }
        </span>
    );
}