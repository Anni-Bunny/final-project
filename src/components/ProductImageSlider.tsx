import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {product} from "../interfaces/product";

interface ProductSliderInterface {
    product: product,
    className?: string,
    color?: string
}

export function ProductImageSlider({product, className, color = 'default'}: ProductSliderInterface) {
    return (
        <div className={`${className} flex`}>
            <Swiper slidesPerView={1}>
                {
                    product && product.images[color].map((image, index) => (

                        <SwiperSlide key={`${product.id}_${color}_${index}`}>
                            <img src={image} alt={product.name} className="h-full mx-auto"/>
                        </SwiperSlide>

                    ))

                }
            </Swiper>
        </div>
    );
}