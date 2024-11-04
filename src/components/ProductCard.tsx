import {Card} from "./Card";
import {productListItem} from "../interfaces/productListItem";
import {Stock} from "./Stock";
import {ProductPrice} from "./ProductPrice";

interface ProductCardProps {
    product: productListItem
}

export function ProductCard({product}: ProductCardProps) {
    return (
        <Card className="space-y-6 px-2 py-4 hover:bg-gray-100 hover:shadow-2xl hover:rounded hover:transition hover:duration-300">
            <img className="bg-[#F6F6F6] h-[25.25rem] bg-cover" src={product.images.default[0]} alt=""/>
            <div className="flex flex-col gap-3">
                <p>{product.name}</p>
                <div className="flex gap-3.5">
                    <Stock product={product}/>
                    <ProductPrice product={product}/>
                </div>
            </div>
        </Card>
    );
}