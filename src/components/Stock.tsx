import {product} from "../interfaces/product";

interface StockParams {
    product: product,
    className?: string
}

export function Stock({product, className}: StockParams) {
    let sizeFound = false;

    Object.keys(product.stock).forEach(color => {
        
        Object.keys(product.stock[color]).forEach(size => {
            if (product.stock[color][size] > 0) {
                sizeFound = true;
                return
            }
        })

    });

    return (
        <span
            className={`border rounded-full py-0.5 px-4 text-sm block w-[6.25rem] ${(product.stock) ? "text-[#0E1422]" : "text-[#E6E7E8]"} ${className}`}>
            {
                (sizeFound) ? "IN STOCK" : "OUT OF STOCK"
            }
        </span>
    );
}