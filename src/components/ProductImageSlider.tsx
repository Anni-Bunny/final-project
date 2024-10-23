import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {productListItem} from "../interfaces/productListItem";

interface ProductSliderInterface {
    product: productListItem,
    className?: string,
    color?: string
}

export function ProductImageSlider({product, className, color = 'default'}: ProductSliderInterface) {
    return (
        <div className={`${className} flex w-full justify-between`}>
            <Swiper slidesPerView={1}>
                {
                    product && product.images[color].map((image, index) => (

                        <SwiperSlide key={`${product.id}_${color}_${index}`}>
                            <img src={image} alt={product.name} className="w-full h-auto"/>
                        </SwiperSlide>

                    ))

                }
            </Swiper>
        </div>
    );
}