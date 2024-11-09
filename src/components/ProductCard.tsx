import {Card} from "./Card";
import {product} from "../interfaces/product";
import {Stock} from "./Stock";
import {ProductPrice} from "./ProductPrice";

interface ProductCardProps {
    product: product
}

export function ProductCard({product}: ProductCardProps) {
    return (
        <Card className="space-y-6 px-2 py-4 hover:shadow-2xl hover:rounded hover:transition hover:duration-300">
            <img className="bg-[#F6F6F6] h-[25.25rem] bg-cover" src={product.images.default[0]} alt=""/>
            <div className="flex flex-col gap-3">
                <p className="overflow-hidden text-nowrap">{product.name}</p>
                <div className="flex gap-3.5">
                    <Stock product={product}/>
                    <ProductPrice product={product}/>
                </div>
            </div>
        </Card>
    );
}