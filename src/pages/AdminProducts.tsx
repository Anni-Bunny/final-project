import {BreadCrumb} from "../components/BreadCrumb";
import React, {ReactNode, useEffect, useState} from "react";
import {SearchInput} from "../components/SearchInput";
import {renponse} from "../interfaces/response";
import api from "../classes/API";
import {topFunction} from "../Helpers/functions";
import {Icon} from "../components/Icon";
import {Pagination} from "../components/Pagination";
import Table from "../components/Table"
import {keyboard} from "@testing-library/user-event/dist/keyboard";
import {TableSearchInput} from "../components/TableSearchInput";

interface Data {
    image: ReactNode,
    productName: string,
    sku: string,
    price: string | number,
    stock: string,
    categories: string,
    action: string,
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

interface selectedOptions {
    color?: string,
    size?: string,
    page?: number | string
}

export function AdminProducts() {
    let links = [
        {
            name: "Admin",
            url: "/admin/dashboard"
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
    const [data, setData] = useState<Data[]>([])


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

            const updatedData = response.data.map((item: any) => ({
                image: <img className="bg-[#F6F6F6] w-12 bg-cover" src={item.images.default[0]} alt=""/>,
                productName: item.name,
                sku: item.sku,
                price: item.price,
                stock: item.stock.blue?.S > 0 ? "IN STOCK" : "OUT OF STOCK",
                categories: item.category.name,
                action: "...",
            }));

            setData(() => updatedData);

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

    const columns: {Header:ReactNode, accessor: keyof Data}[] = [
        {Header: <Icon name="sort"/>, accessor: 'image'},
        {Header: 'Product name', accessor: 'productName'},
        {Header: 'sku', accessor: 'sku'},
        {Header: 'price', accessor: 'price'},
        {Header: 'stock', accessor: 'stock'},
        {Header: 'categories', accessor: 'categories'},
        {Header: 'action', accessor: 'action'},
    ];

    return (
        <div className='flex flex-col gap-16 h-full'>
            <BreadCrumb isInContainer={false} className="" links={links}/>

            <div className="max-h-[45rem] h-full bg-white py-6 px-12 flex-col relative">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg">Products</h4>
                    <TableSearchInput placeholder="Search product"/>
                </div>

                <Table columns={columns} data={data} />

                <div className="absolute bottom-10 right-12">
                    {response.pages &&
                        <Pagination pageCount={response.pages} className="w-full justify-end" onChange={onChangeRadio}
                                    selectedOptionsPage={selectedOptions.page}/>}
                </div>
            </div>
        </div>
    );
}