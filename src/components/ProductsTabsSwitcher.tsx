import {Slider} from "./Slider";
import {useEffect, useState} from "react";
import {product} from "../interfaces/product";
import api from "../classes/API";
import {TabSwitcher} from "./TabSwitcher";

export function ProductsTabsSwitcher() {

    const [featuredProducts, setFeaturedProducts] = useState<product[]>([]);
    const [latestProducts, setlatestProducts] = useState<product[]>([]);

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

    const tabs = [
        {name: 'featured', title: 'Featured'},
        {name: 'latest', title: 'Latest'}
    ];

    const content = [
        {
            name: 'featured',
            component: <Slider products={featuredProducts}/>
        },
        {
            name: 'latest',
            component: <Slider products={latestProducts}/>
        }

    ];

    const containerClassName: string = "pt-[9.5rem]"

    return (
        <TabSwitcher
            tabs={tabs}
            content={content}
            containerClassName={containerClassName}
            btnDivClassName={"w-full justify-center"}
        />
    );
}
