import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {ProductCard} from "./ProductCard";
import {productListItem} from "../interfaces/productListItem";

interface ProductSliderInterface {
    products: productListItem[]
}

export function Slider({products}: ProductSliderInterface) {
    return (
        <Swiper className="flex w-full justify-between"
                spaceBetween={50}
                slidesPerView={4}
        >
            {
                products.map(product => (
                    <SwiperSlide key={product.id}>
                        <ProductCard key={product.id} product={product}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
}