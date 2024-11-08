import {NotificationBar} from "../components/NotificationBar";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Container} from "../components/Container";
import {Slider} from "../components/Slider";
import {useEffect, useState} from "react";
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

export function Product() {

    const {id} = useParams()
    const [product, setProduct] = useState<product>();
    const [products, setProducts] = useState<product[]>([]);

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
            const products = await api.getProducts();
            if (products) {
                setProducts(products);
            }

            if (id) {
                const product = await api.getProducts({id:id});
                setProduct(product)
            }
        }

        fetchProducts();
    }, [id]);

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
                        <div className="w-1/2 py-3">
                            <h3 className="text-2xl font-bold text-[#0E1422] mb-3">{product.name}</h3>
                            <div className="flex gap-2 mb-6">
                                <Button type="LightGrayBtn" title={"4.2 — 54 Reviews"}
                                        className="h-7 flex-row-reverse gap-2" icon={"star"}/>
                                <Stock product={product} className="h-7"/>
                            </div>
                            <ProductPrice product={product} className="text-[#0E1422] font-semibold text-lg mb-8"/>
                            <div>
                                <h3 className="text-[#5C5F6A]">AVAILABLE COLORS</h3>
                                <Radio name={"color"} type={"color"}/>
                            </div>
                            <div>
                                <h3 className="text-[#5C5F6A]">SELECT SIZE</h3>
                                <Radio name={"size"} type={"text"} label={"S"}/>
                            </div>
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