import {NotificationBar} from "../components/NotificationBar";
import {useEffect, useState} from "react";
import {Header} from "../components/Header";
import api from "../classes/API";
import {Container} from "../components/Container";
import {Button} from "../components/Button";
import {PromiseCard} from "../components/PromiseCard";
import {productListItem} from "../interfaces/productListItem";
import {ProductCard} from "../components/ProductCard";

export function Homepage() {

    const [data, setData] = useState<productListItem[]>([]);

    useEffect(() => {
        async function fetchProducts () {
            try {
                const products = await api.getProducts();
                setData(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);


    return (
        <div>
            <NotificationBar/>
            <Header/>
            <section className="h-[27.5rem] bg-[#F6F6F6]">
                <Container className="h-full justify-between">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-[0.75rem]">
                            <h1 className="font-bold text-[2rem]">Fresh Arrivals Online</h1>
                            <p className="text-[0.875rem]">Discover Our Newest Collection Today.</p>
                        </div>
                        <div>
                            <Button name={"arrowRight"} title={"View Collection"}/>
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

            <section className="pt-20">
                <Container className="h-[16.625rem] justify-between">
                    <PromiseCard icon={"delivery"} heading={"Free Shipping"}
                                 paragraph={"Upgrade your style today and get FREE shipping on all orders! Don't miss out."}/>
                    <PromiseCard icon={"starBadge"} heading={"Satisfaction Guarantee"}
                                 paragraph={"Shop confidently with our Satisfaction Guarantee: Love it or get a refund."}/>
                    <PromiseCard icon={"shieldCheck"} heading={"Secure Payment"}
                                 paragraph={"Your security is our priority. Your payments are secure with us."}/>
                </Container>
            </section>

            <section className="pt-[4.5rem]">
                <Container className="flex-col gap-20">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-xs">Shop Now</p>
                        <h3 className="text-2xl font-bold">Best Selling</h3>
                    </div>
                    <div className="flex">
                        {
                            data.map(product => (
                                <ProductCard key={product.id} product={product}/>
                            ))
                        }
                    </div>
                </Container>
            </section>
        </div>


    );
}