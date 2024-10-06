import {Card} from "./Card";
import {productListItem} from "../interfaces/productListItem";

interface ProductCardProps {
    product: productListItem
}

export function ProductCard({product}: ProductCardProps) {
    return (
        <Card>
            <img src={product.image} alt=""/>
            <div>
                <p>{product.name}</p>
                <div>
                    <span>{product.stock}</span>
                    <span>{product.price}</span>
                </div>
            </div>
        </Card>
    );
}