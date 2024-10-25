import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {ProductCard} from "./ProductCard";
import {productListItem} from "../interfaces/productListItem";
import {Link} from "react-router-dom";

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
                           <Link to={"/products/" + product.id}><ProductCard key={product.id} product={product}/></Link>
                       </SwiperSlide>
                   ))
               }

           </Swiper>
       </div>
    );
}