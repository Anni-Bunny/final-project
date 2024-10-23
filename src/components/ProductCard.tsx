import {Card} from "./Card";
import {productListItem} from "../interfaces/productListItem";

interface ProductCardProps {
    product: productListItem
}

export function ProductCard({product}: ProductCardProps) {
    return (
        <Card className="space-y-6 px-2 py-4">
            <img className="bg-[#F6F6F6]" src={product.images.default[0]} alt=""/>
            <div className="flex flex-col gap-3">
                <p>{product.name}</p>
                <div className="flex gap-3.5">
                    <span className={`border rounded-full py-0.5 px-4 text-sm ${(product.stock)? "text-[#0E1422]" : "text-[#E6E7E8]"}`}>
                        {
                            (product.stock)?"IN STOCK":"OUT OF STOCK"
                        }
                    </span>
                    <span>
                        {
                            product.price > 0 ?`$${product.price}.00` : <span>`$${product.price}`</span>
                        }
                    </span>
                </div>
            </div>
        </Card>
    );
}