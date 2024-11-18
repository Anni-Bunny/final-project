import {NotificationBar} from "../components/NotificationBar";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {BreadCrumb} from "../components/BreadCrumb";
import {Link} from "react-router-dom";
import {ProductCard} from "../components/ProductCard";
import React, {useEffect, useState} from "react";
import api from "../classes/API";
import {Container} from "../components/Container";
import {category} from "../interfaces/category";
import {CheckBox} from "../components/CheckBox"
import {Radio} from "../components/Radio";
import {RangeSlider} from "../components/RangeSlider";
import {SortDropdown} from "../components/SortDropdown";
import {renponse} from "../interfaces/response";
import {Pagination} from "../components/Pagination";
import {topFunction} from "../Helpers/functions";

interface selectedOptions {
    color?: string,
    size?: string,
    page?: number | string
}

const defaultResponse = {
    first: 1,
    prev: null,
    next: null,
    last: null,
    pages: null,
    items: null,
    data: []
}

export function Products() {

    const [categories, setCategories] = useState<category[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<selectedOptions>({page: 1})
    const [sortedBy, setSortedBy] = useState('-date');
    const [sortTitle, setSortTitle] = useState('Date desc');
    const [response, setResponse] = useState<renponse>(defaultResponse)

    function resetPage() {
        setSelectedOptions(state => (
            {
                ...state,
                page: 1
            }
        ))
    }

    const colors = ["blue", "yellow", "green"]
    const sizes = ["S", "M", "L", "XL", "XXL"]


    useEffect(() => {
        async function getProducts() {
            const response = await api.getProducts({_sort: sortedBy, _page: selectedOptions.page});
            setResponse(response);
        }

        async function getCategories() {
            const categories = await api.getCategories();
            if (categories) {
                setCategories(categories);
            }
        }

        getProducts();

        if (!categories.length) {
            getCategories()
        }

        topFunction()
    }, [sortedBy, selectedOptions.page]);


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
        if (checked) {
            setSelectedCategoryId(prevState => ([
                ...prevState,
                currentValue
            ]));
        } else {
            setSelectedCategoryId(prevState => (prevState.filter(item => item !== currentValue)));
        }
        resetPage()
    };

    function onChangeRadio(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.currentTarget.value
        const name = event.currentTarget.name

        if (name !== "page") {

            setSelectedOptions((state) => ({
                ...state,
                page: 1,
                [name]: val
            }));

        } else {

            setSelectedOptions((state) => ({
                ...state,
                [name]: val
            }));

        }
    }

    const sortByList = [
        {
            title: 'Date',
            sortKey: 'createdAt',
        },
        {
            title: 'price',
            sortKey: 'price',
        }
    ];

    const sortReviews = (sortBy: string, title: string) => {
        setSortedBy(sortBy);
        setSortTitle(title);
        resetPage();
    };


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
                                    colors.map((color, index) =>
                                        <Radio onChange={onChangeRadio}
                                               key={index}
                                               checked={selectedOptions.color === color}
                                               name={"color"}
                                               value={color}
                                               type={"color"}/>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <h4>Size</h4>
                            <div className="flex gap-3">
                                {
                                    sizes.map((size, index) =>
                                        <Radio onChange={onChangeRadio}
                                               key={index}
                                               checked={selectedOptions.size === size}
                                               name={"size"}
                                               value={size}
                                               label={size}
                                               type={"text"}/>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <h4>Price</h4>

                            <RangeSlider/>
                        </div>
                    </div>

                    <div>
                        <SortDropdown sortedBy={sortedBy}
                                      sortTitle={sortTitle}
                                      sortByList={sortByList}
                                      onSortChange={sortReviews}
                        />

                        <div className="flex-col grid grid-cols-3 gap-8 mb-16">
                            {
                                response.data.map(product => (
                                    <Link to={"/products/" + product.id}>
                                        <ProductCard key={product.id} product={product}/>
                                    </Link>
                                ))
                            }
                        </div>

                        <div className=" flex justify-center">
                            {response.pages &&
                                <Pagination pageCount={response.pages} className="mb-32" onChange={onChangeRadio}
                                            selectedOptionsPage={selectedOptions.page}/>}
                        </div>
                    </div>


                </div>
            </Container>

            <Footer displayNewsLetter={true}/>
        </div>
    );
}