import {NotificationBar} from "../components/NotificationBar";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Container} from "../components/Container";
import {Slider} from "../components/Slider";
import React, {useEffect, useState} from "react";
import {product} from "../interfaces/product";
import api from "../classes/API";
import {ProductImageSlider} from "../components/ProductImageSlider";
import {BreadCrumb} from "../components/BreadCrumb";
import {useParams} from "react-router-dom";
import {Button} from "../components/Button";
import {Stock} from "../components/Stock";
import {ProductPrice} from "../components/ProductPrice";
import {Radio} from "../components/Radio";
import {InfoTabsSwitcher} from "../components/InfoTabsSwitcher";
import {Icon} from "../components/Icon";
import {review} from "../interfaces/review";
import { useDispatch } from 'react-redux'
import {cartItem} from "../interfaces/cart";
import {addProduct} from "../store/slices/cartSlice";

interface selectedOptions {
    color?: string,
    size?: string
}

export function Product() {

    const dispatch = useDispatch()

    const {id} = useParams()
    const [product, setProduct] = useState<product>();
    const [products, setProducts] = useState<product[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<selectedOptions>({})
    const [productQuantity, setProductQuantity] = useState<number>(0)
    const [reviews, setReviews] = useState<review[]>([])
    const [reviewCount, setReviewCount] = useState<number>(0)

    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "Products",
            url: "/products"
        },
        {
            name: product?.name
        }
    ]

    useEffect(() => {
        async function fetchProducts() {
            const products = await api.getProducts({_sort: "-score"});
            if (products) {
                setProducts(products);
            }

            if (id) {
                const product = await api.getProducts({id: id});
                setProduct(product)
                let colors = Object.keys(product.stock)
                let sizes = Object.keys(product.stock[colors[0]])
                setSelectedOptions({color: colors[0], size: sizes[0]})
            }
        }

        async function fetchReviews() {
            const reviewsRequest = await api.getReviews({productId: id});
            if (reviewsRequest) {
                setReviews(reviewsRequest.data);
                setReviewCount(reviewsRequest.items);
            }
        }

        fetchProducts();
        fetchReviews();
    }, [id]);

    console.log(reviews)

    function onChangeRadio(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.currentTarget.value
        const name = event.currentTarget.name

        if (selectedOptions.size && product && name === "color") {
            const availableSizes = Object.keys(product.stock[val])
            const newSize = availableSizes.includes(selectedOptions.size) ? selectedOptions.size : availableSizes[0]
            setSelectedOptions((state) => ({
                size: newSize,
                [name]: val
            }));
        } else {
            setSelectedOptions((state) => ({
                ...state,
                [name]: val
            }));
        }
    }

    function changeProductQuantity(event: React.MouseEvent<HTMLButtonElement>) {
        if (event.currentTarget.name === "minus" && productQuantity > 0) {
            setProductQuantity((state) => state - 1)
        } else if (product && selectedOptions.color && selectedOptions.size &&
            event.currentTarget.name === "plus" && productQuantity < product.stock[selectedOptions.color][selectedOptions.size]) {
            setProductQuantity((state) => state + 1)
        }
    }

    function addToCart() {
        if (id && selectedOptions.color && selectedOptions.size && productQuantity && product) {
            const cartItem: cartItem = {
                image: product.images[selectedOptions.color][0],
                name: product.name,
                price: product.price,
                stock:product.stock[selectedOptions.color][selectedOptions.size],
                productId: Number(id),
                color: selectedOptions.color,
                size: selectedOptions.size,
                quantity: productQuantity
            }
            dispatch(addProduct(cartItem))
        }
        setProductQuantity(0)
    }

    return (
        <>
            <NotificationBar/>
            <Header/>
            <BreadCrumb links={links}/>
            <section>
                {
                    product &&
                    <Container className="justify-between pb-44 gap-32">
                        <ProductImageSlider key={product.id} className="h-[40rem] w-1/2 bg-[#F6F6F6] rounded"
                                            product={product}/>
                        <div className="h-[40rem] w-1/2 py-3 flex flex-col justify-between">
                            <h3 className="text-2xl font-bold text-[#0E1422] mb-4">{product.name}</h3>
                            <div className="flex gap-2 mb-6">
                                <div className="flex gap-2 bg-[#F6F6F6] rounded-full py-0.5 px-6 justify-center"><Icon
                                    name={"star"}/> {`${product.score} — ${reviewCount} Reviews`}</div>
                                <Stock product={product} className="h-7"/>
                            </div>
                            <div className="mb-10">
                                <ProductPrice product={product} className="text-[#0E1422] text-xl font-bold"/>
                            </div>

                            <div className="mb-6 flex flex-col gap-2">
                                <h3 className="text-[#5C5F6A]">AVAILABLE COLORS</h3>
                                <div className="flex gap-3">
                                    {
                                        Object.keys(product.stock).map((color, index) =>
                                            <Radio onChange={onChangeRadio}
                                                   key={index}
                                                   checked={selectedOptions.color === color}
                                                   name={"color"}
                                                   value={color}
                                                   type={"color"}/>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="mb-6 flex flex-col gap-2">
                                <h3 className="text-[#5C5F6A]">SELECT SIZE</h3>
                                <div className="flex gap-3">
                                    {
                                        selectedOptions.color &&
                                        Object.keys(product.stock[selectedOptions.color]).map((size, index) =>
                                            <Radio onChange={onChangeRadio}
                                                   key={index}
                                                   checked={selectedOptions.size === size}
                                                   name={"size"}
                                                   value={size}
                                                   label={size}
                                                   type={"text"}/>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="mb-10 flex flex-col gap-2">
                                <h3 className="text-[#5C5F6A]">QUANTITY</h3>
                                <div
                                    className="h-11 min-w-10 w-40 flex items-center justify-between border border-[#E6E7E8] px-4 ">
                                    <Button icon={"minus"} name={"minus"} type={"QuantityBtn"}
                                            onClick={changeProductQuantity}/>
                                    <h3 className="text-sm text-[#202533]">{productQuantity}</h3>
                                    <Button icon={"add"} name={"plus"} type={"QuantityBtn"}
                                            onClick={changeProductQuantity}/>
                                </div>

                            </div>
                            <div className="flex gap-4 mb-3">
                                <Button onClick={addToCart} className="w-72" title={"Add to cart"}/>
                                <div className="w-11 h-11 flex items-center justify-center border border-[#E6E7E8]">
                                    <Icon name={"heart"}/>
                                </div>
                            </div>
                            <p className="mb-1.5 text-xs text-[#5C5F6A] font-medium">— Free shipping on orders $100+</p>
                        </div>
                    </Container>
                }
            </section>

            <section>
                {
                    product &&
                    <InfoTabsSwitcher product={product}/>
                }
            </section>


            <Container className="pb-36 flex flex-col gap-14">
                <div className=" flex flex-col w-full items-start px-3 pt-4 gap-2">
                    <h3 className="text-2xl font-bold text-[#0E1422]">You might also like</h3>
                    <p className="text-xs text-[#878A92]">SIMILAR PRODUCTS</p>
                </div>
                <Slider products={products}/>
            </Container>

            <Footer displayNewsLetter={true}/>
        </>
    );
}