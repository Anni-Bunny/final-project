import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {ProductCard} from "./ProductCard";
import {productListItem} from "../interfaces/productListItem";

interface ProductSliderInterface {
    products: productListItem[],
    className?: string
}

export function Slider({products, className}: ProductSliderInterface) {
    return (
       <div className={`${className} flex w-full justify-between`}>
           <Swiper
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
       </div>
    );
}