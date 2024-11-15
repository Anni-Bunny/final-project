import {NotificationBar} from "../components/NotificationBar";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {BreadCrumb} from "../components/BreadCrumb";
import {Link} from "react-router-dom";
import {ProductCard} from "../components/ProductCard";
import {product} from "../interfaces/product";
import React, {useEffect, useState} from "react";
import api from "../classes/API";
import {Container} from "../components/Container";
import {category} from "../interfaces/category";
import {CheckBox} from "../components/CheckBox"
import {Radio} from "../components/Radio";
import {RangeSlider} from "../components/RangeSlider";

interface selectedOptions {
    color?: string,
    size?: string
}

export function Products() {

    const [products, setProducts] = useState<product[]>([]);
    const [categories, setCategories] = useState<category[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<string[]>([]);
    const [firstProduct, setFirstProduct] =useState<product | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<selectedOptions>({})

    useEffect(() => {
        async function getProducts() {
            const products = await api.getProducts();
            if (products) {
                setProducts(products);
                const product = products[0];
                setFirstProduct(product);
                let colors = Object.keys(product.stock)
                let sizes = Object.keys(product.stock[colors[0]])
                setSelectedOptions({color: colors[0], size: sizes[0]})
            }
        }

        async function getCategories() {
            const categories = await api.getCategories();
            if (categories) {
                setCategories(categories);
            }
        }

        getProducts();
        getCategories()
    }, []);


    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "Products",
            url: "/products"
        }
    ]


    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = event.currentTarget.value
        const checked = event.currentTarget.checked
        if (checked){
            setSelectedCategoryId(prevState => ([
                ...prevState,
                currentValue
            ]));
        } else {
            setSelectedCategoryId(prevState => (prevState.filter(item => item !== currentValue)));
        }

    };

    function onChangeRadio(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.currentTarget.value
        const name = event.currentTarget.name

        if (selectedOptions.size && firstProduct && name === "color") {
            const availableSizes = Object.keys(firstProduct.stock[val])
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



    return (
        <div>
            <NotificationBar/>
            <Header/>
            <BreadCrumb links={links}/>

            <Container>
                <div className="flex gap-5">
                    <div
                        className="flex flex-col max-w-64 max-h-[51.75 rem] h-full w-full align-top border border-[#E6E7E8] py-6 px-4 gap-10">
                        <div className="flex flex-col gap-4">
                            <h4>Categories</h4>
                            <div className="flex flex-col">
                                {categories.map((category) => (
                                    <div className="flex items-center py-3 px-1 border-b border-[#E9E9EB] font-normal">
                                        <CheckBox
                                            key={category.id}
                                            name="category"
                                            value={category.id}
                                            label={category.name}
                                            checked={selectedCategoryId.includes(category.id)}
                                            onChange={handleCategoryChange}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4>Color</h4>
                            <div className="flex gap-3">
                                {
                                    firstProduct &&
                                    Object.keys(firstProduct.stock).map((color, index) =>
                                        <Radio onChange={onChangeRadio} key={index}
                                               checked={selectedOptions.color === color} name={"color"}
                                               value={color} type={"color"}/>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <h4>Size</h4>
                            <div className="flex gap-3">
                                {
                                    selectedOptions.color && firstProduct &&
                                    Object.keys(firstProduct.stock[selectedOptions.color]).map((size, index) =>
                                        <Radio onChange={onChangeRadio} key={index}
                                               checked={selectedOptions.size === size} name={"size"}
                                               value={size} label={size} type={"text"}/>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <h4>Price</h4>

                            <RangeSlider/>

                        </div>
                    </div>

                    <div className="flex-col grid grid-cols-3">
                        {
                            products.map(product => (
                                <Link to={"/products/" + product.id}>
                                    <ProductCard key={product.id} product={product}/>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </Container>

            <Footer displayNewsLetter={true}/>
        </div>
    );
}