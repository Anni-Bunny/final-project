import {product} from "../interfaces/product";

interface ProductPriceParams {
    product: product,
    className?: string
}

export function ProductPrice({product, className}: ProductPriceParams) {
    return (
        <span className={`${className}`}>
            {
                product.price > 0 ? `$${product.price}.00` : <span>`$${product.price}`</span>
            }
        </span>
    );
}