import {BreadCrumb} from "../components/BreadCrumb";
import React, {useEffect, useState} from "react";
import {SearchInput} from "../components/SearchInput";
import {Link} from "react-router-dom";
import {ProductCard} from "../components/ProductCard";
import {renponse} from "../interfaces/response";
import api from "../classes/API";
import {topFunction} from "../Helpers/functions";
import {Icon} from "../components/Icon";
import {Pagination} from "../components/Pagination";

const defaultResponse = {
    first: 1,
    prev: null,
    next: null,
    last: null,
    pages: null,
    items: null,
    data: []
}

interface selectedOptions {
    color?: string,
    size?: string,
    page?: number | string
}

export function AdminProducts() {
    let links = [
        {
            name: "Admin",
            url: "/admin/products"
        },
        {
            name: "Products",
            url: ""
        }
    ]
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [response, setResponse] = useState<renponse>(defaultResponse)
    const [sortedBy, setSortedBy] = useState('-date');
    const [selectedOptions, setSelectedOptions] = useState<selectedOptions>({page: 1})
    const [sortTitle, setSortTitle] = useState('Date desc');

    const handleSearch = (query: string) => {
        // Perform your search logic here, for example:
        // Fetch results from an API, or filter data.
        console.log('Searching for:', query);

        // Example of updating search results (simulated data)
        const results = ['apple', 'banana', 'orange', 'grape', 'watermelon'].filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    };

    function resetPage() {
        setSelectedOptions(state => (
            {
                ...state,
                page: 1
            }
        ))
    }

    useEffect(() => {
        async function getProducts() {
            const response = await api.getProducts({_sort: sortedBy, _page: selectedOptions.page, _per_page: 6});
            setResponse(response);
        }

        getProducts();

        topFunction()
    }, [sortedBy, selectedOptions.page]);

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

    return (
        <div className='flex flex-col gap-16'>
            <BreadCrumb isInContainer={false} className="" links={links}/>

            <div className="relative overflow-x-auto overflow-y-auto bg-white py-6 px-12 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg">Products</h4>
                    <SearchInput onSearch={handleSearch} placeholder="Search..."/>
                </div>


                <table className="w-full text-sm text-left ">
                    <thead className="text-xs text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <Icon name="sort"/>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            sku
                        </th>
                        <th scope="col" className="px-6 py-3">
                            price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            stock
                        </th>
                        <th scope="col" className="px-6 py-3">
                            categories
                        </th>
                        <th scope="col" className="px-6 py-3">
                            action
                        </th>
                    </tr>
                    </thead>


                    <tbody>

                    {
                        response.data.map((product) => (
                            <tr className="bg-white border-b border-[#F6F6F6]" key={product.id}>
                                <td className="px-6 py-4">
                                    <img className="bg-[#F6F6F6] w-12 bg-cover"
                                         src={product.images.default[0]} alt=""/>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {product.name}
                                </td>
                                <td className="px-6 py-4">
                                    {product.sku}
                                </td>
                                <td className="px-6 py-4">
                                    {product.price}
                                </td>
                                <td className="px-6 py-4">
                                    {product.stock.blue.s}
                                </td>
                                <td className="px-6 py-4">
                                    {product.category.name}
                                </td>
                                <td className="px-6 py-4">
                                    ...
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>

                <>
                    {response.pages &&
                        <Pagination pageCount={response.pages} className="w-full justify-end" onChange={onChangeRadio}
                                    selectedOptionsPage={selectedOptions.page}/>}
                </>
            </div>
        </div>
    );
}