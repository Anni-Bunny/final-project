import {Slider} from "./Slider";
import {useEffect, useState} from "react";
import {product} from "../interfaces/product";
import api from "../classes/API";
import {TabSwitcher} from "./TabSwitcher";

export function ProductsTabsSwitcher() {

    const [products, setProducts] = useState<product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const products = await api.getProducts();
            if (products)
                setProducts(products);
        }

        fetchProducts();
    }, []);


    const tabs = [
        {name: 'featured', title: 'Featured'},
        {name: 'latest', title: 'Latest'}
    ];

    const content = [
        {
            name: 'featured',
            component: <Slider products={products}/>
        },
        {
            name: 'latest',
            component: <Slider products={products}/>
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
