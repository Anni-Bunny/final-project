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

interface selectedOptions {
    color?: string,
    size?: string
}

export function Product() {

    const {id} = useParams()
    const [product, setProduct] = useState<product>();
    const [products, setProducts] = useState<product[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<selectedOptions>({})

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
            name: "Raw Black T-Shirt Lineup"
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

        fetchProducts();
    }, [id]);

    function onChangeRadio(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.currentTarget.value
        const name = event.currentTarget.name

        if (selectedOptions.size && product && name === "color") {
            const availableSizes = Object.keys(product.stock[val])
            const newSize = availableSizes.includes(selectedOptions.size) ? selectedOptions.size : availableSizes[0]
            setSelectedOptions((state) => ({
                ...state,
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


    function addToCart() {
        console.log(selectedOptions)
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
                        <ProductImageSlider className="h-[40rem] w-1/2 bg-[#F6F6F6] rounded" product={product}/>
                        <div className="h-[40rem] w-1/2 py-3">
                            <h3 className="text-2xl font-bold text-[#0E1422] mb-3">{product.name}</h3>
                            <div className="flex gap-2 mb-6">
                                <Button type="LightGrayBtn" title={"4.2 — 54 Reviews"}
                                        className="h-7 flex-row-reverse gap-2" icon={"star"}/>
                                <Stock product={product} className="h-7"/>
                            </div>
                            <div className="mb-8">
                                <ProductPrice product={product} className="text-[#0E1422] font-semibold text-lg"/>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-[#5C5F6A]">AVAILABLE COLORS</h3>
                                <div className="flex gap-3">
                                    {
                                        Object.keys(product.stock).map((color, index) =>
                                            <Radio onChange={onChangeRadio} key={index} checked={selectedOptions.color === color} name={"color"}
                                                   value={color} type={"color"}/>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-[#5C5F6A]">SELECT SIZE</h3>
                                <div className="flex gap-3">
                                    {
                                        selectedOptions.color &&
                                        Object.keys(product.stock[selectedOptions.color]).map((size, index) =>
                                            <Radio onChange={onChangeRadio} key={index} checked={selectedOptions.size === size} name={"size"}
                                                   value={size} label={size} type={"text"}/>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-[#5C5F6A]">QUANTITY</h3>

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