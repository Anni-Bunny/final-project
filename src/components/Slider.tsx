import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {ProductCard} from "./ProductCard";
import {product} from "../interfaces/product";
import {Link} from "react-router-dom";

interface ProductSliderInterface {
    products: product[],
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