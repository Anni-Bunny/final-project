import React, {useEffect, useState} from "react";
import api from "../classes/API";
import {Container} from "../components/Container";
import {Button} from "../components/Button";
import {PromiseCard} from "../components/PromiseCard";
import {product} from "../interfaces/product";
import {Slider} from "../components/Slider";
import {ProductsTabsSwitcher} from "../components/ProductsTabsSwitcher";
import {Link} from "react-router-dom";

export function Homepage() {
    const [bestSelling, setBestSelling] = useState<product[]>([])

    useEffect(() => {
        async function fetchProducts() {
            const products = await api.getProducts({_sort: "-score"});
            if (products)
                setBestSelling(products);
        }

        fetchProducts();
    }, []);


    return (
        <div>
            <section className="h-[27.5rem] bg-[#F6F6F6]">
                <Container className="h-full justify-between">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-[0.75rem]">
                            <h1 className="font-bold text-[2rem]">Fresh Arrivals Online</h1>
                            <p className="text-[0.875rem]">Discover Our Newest Collection Today.</p>
                        </div>
                        <div>
                            <Link to={"/products"}><Button icon={"arrowRight"} title={"View Collection"}/></Link>
                        </div>
                    </div>
                    <div className="h-full flex items-end">
                        <div className="rounded-full h-[21.25rem] w-[21.25rem] bg-[#E9E9EB] flex relative ">
                            <img className="h-[2.375rem] absolute top-0 left-0" src="/images/homepageSection1Star.png"
                                 alt="star"/>
                            <img className="h-[22.875rem] absolute right-0 bottom-0" src="/images/homepageSection1.png"
                                 alt="photo"/>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="mt-20">
                <Container className="h-[16.625rem] justify-between">
                    <PromiseCard icon={"delivery"} heading={"Free Shipping"}
                                 paragraph={"Upgrade your style today and get FREE shipping on all orders! Don't miss out."}/>
                    <PromiseCard icon={"starBadge"} heading={"Satisfaction Guarantee"}
                                 paragraph={"Shop confidently with our Satisfaction Guarantee: Love it or get a refund."}/>
                    <PromiseCard icon={"shieldCheck"} heading={"Secure Payment"}
                                 paragraph={"Your security is our priority. Your payments are secure with us."}/>
                </Container>
            </section>

            <section className="mt-[4.5rem]">
                <Container className="flex-col gap-20">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-xs">Shop Now</p>
                        <h3 className="text-2xl font-bold">Best Selling</h3>
                    </div>
                    <Slider products={bestSelling}/>
                </Container>
            </section>
            <section className="mt-40 bg-[#F6F6F6]">
                <Container className="justify-between">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-6">
                            <h3 className="text-2xl font-bold">Browse Our Fashion Paradise!</h3>
                            <p className="text-sm w-5/6">Step into a world of style and explore our diverse collection
                                of clothing categories.</p>
                        </div>
                        <div>
                            <Link to={"/products"}><Button className="inline" icon={"arrowRight"} title={"Start Browsing"}/></Link>
                        </div>
                    </div>
                    <img className="h-[19.438rem]" src="/images/categoryImage.png" alt=""/>
                </Container>
            </section>

            <ProductsTabsSwitcher/>
        </div>
    );
}