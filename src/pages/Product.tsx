import {NotificationBar} from "../components/NotificationBar";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Container} from "../components/Container";
import {Slider} from "../components/Slider";
import {useEffect, useState} from "react";
import {productListItem} from "../interfaces/productListItem";
import api from "../classes/API";
import {ProductImageSlider} from "../components/ProductImageSlider";

export function Product() {

    const [BestSellers, setBestSellers] = useState<productListItem[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const products = await api.getBestSellers();
            if (products)
                setBestSellers(products);
        }

        fetchProducts();
    }, []);

    return (
        <>
            <NotificationBar/>
            <Header/>
            <section>
                <Container>
                    <ProductImageSlider product={BestSellers[0]}/>
                    <div>
                        <h3>Raw Black T-Shirt Lineup</h3>
                    </div>
                </Container>
            </section>

            <Container className="pb-36 flex flex-col gap-14">
                <div className=" flex flex-col w-full items-start px-3 pt-4 gap-2">
                    <h3 className="text-2xl font-bold text-[#0E1422]">You might also like</h3>
                    <p className="text-xs text-[#878A92]">SIMILAR PRODUCTS</p>
                </div>
                <Slider products={BestSellers}/>
            </Container>

            <Footer displayNewsLetter={true}/>
        </>
    );
}