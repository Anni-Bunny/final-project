import {Button} from "./Button";
import {Slider} from "./Slider";
import React, {useEffect, useState} from "react";
import {productListItem} from "../interfaces/productListItem";
import api from "../classes/API";
import {Container} from "./Container";

export function TabSwitcher() {

    const [featuredProducts, setFeaturedProducts] = useState<productListItem[]>([]);
    const [latestProducts, setlatestProducts] = useState<productListItem[]>([]);

    useEffect(() => {
        async function getFeaturedProducts() {
            const products = await api.getBestSellers();
            if (products)
                setlatestProducts(products);
        }
        getFeaturedProducts();

        async function getLatestProducts() {
            const products = await api.getFeaturedProducts();
            if (products)
                setFeaturedProducts(products);
        }
        getLatestProducts();
    }, []);


    const tabs = {
        features: 'Features Content',
        latest: 'Latest Content'
    }

    const [currentTab, setCurrentTab] = useState<string>(tabs.features)

    function onChangeTab(event: React.MouseEvent<HTMLButtonElement>) {
        setCurrentTab(tabs[event.currentTarget.name as keyof typeof tabs])
    }

    return (
        <section className="mt-36 mb-44">
            <Container className="flex flex-col gap-12">
                <div className="flex items-center mx-auto gap-6 text-sm">
                    <Button onClick={onChangeTab} name={"features"} title={"Featured"} type={"button-8"}/>
                    <Button onClick={onChangeTab} name={"latest"} title={"Latest"} type={"button-8"}/>
                </div>
                {
                    currentTab === tabs.features ? <Slider products={featuredProducts}/> : <Slider products={latestProducts}/>
                }
            </Container>
        </section>
    )
}