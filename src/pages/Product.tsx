import {NotificationBar} from "../components/NotificationBar";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Container} from "../components/Container";
import {Slider} from "../components/Slider";
import {useEffect, useState} from "react";
import {productListItem} from "../interfaces/productListItem";
import api from "../classes/API";
import {ProductImageSlider} from "../components/ProductImageSlider";
import {BreadCrumb} from "../components/BreadCrumb";
import {useParams} from "react-router-dom";

export function Product() {

    const {id} = useParams()
    const [BestSellers, setBestSellers] = useState<productListItem[]>([]);
    const [product, setProduct] = useState<productListItem>();

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
            const products = await api.getBestSellers();
            if (products) {
                setBestSellers(products);
            }

            if (id) {
                const product = await api.getBestSellers(id);
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
                        <div className="w-1/2">
                            <h3 className="text-2xl font-bold text-[#0E1422] w-full">{product.name}</h3>
                        </div>
                    </Container>
                }
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