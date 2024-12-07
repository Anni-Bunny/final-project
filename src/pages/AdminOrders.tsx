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
import {order} from "../interfaces/order";

interface Data {
    image: ReactNode,
    userId: string | number,
    date: string,
    total: string | number,
    status: string,
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

export function AdminOrders() {
    let links = [
        {
            name: "Admin",
            url: "/admin/dashboard"
        },
        {
            name: "Orders",
            url: ""
        }
    ]
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [response, setResponse] = useState<renponse>(defaultResponse)
    const [sortedBy, setSortedBy] = useState('-date');
    const [selectedOptions, setSelectedOptions] = useState<selectedOptions>({page: 1})
    const [sortTitle, setSortTitle] = useState('Date desc');
    const [data, setData] = useState<Data[]>([])

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
            const response = await api.getOrders({_page: selectedOptions.page, _per_page: 6});
            setResponse(response);

            let updatedData: Data[] = []

            response.data.forEach((order: order) => {
                let totalPrice = 0;

                order.products.forEach((product) => (
                    totalPrice += product.price
                ))

                const images = order.products.map((item,index) => (
                        <img
                            key={index}
                            className="bg-[#F6F6F6] w-12 bg-cover rounded-full"
                            src={item.image}
                            alt=""
                        />
                    ));

                updatedData.push({
                    image: <div className="flex gap-2"> {images} </div>,
                    userId: order.userId,
                    date: order.createdAt,
                    total: totalPrice,
                    status: order.status,
                    action: "...",
                })
            })

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

    const columns: { Header: ReactNode, accessor: keyof Data }[] = [
        {Header: <Icon name="sort"/>, accessor: 'image'},
        {Header: 'User Id', accessor: 'userId'},
        {Header: 'Date', accessor: 'date'},
        {Header: 'Total', accessor: 'total'},
        {Header: 'Status', accessor: 'status'},
        {Header: 'action', accessor: 'action'},
    ];

    return (
        <div className='flex flex-col gap-16 h-full'>
            <BreadCrumb isInContainer={false} className="" links={links}/>

            <div className="max-h-[45rem] h-full bg-white flex justify-between py-6 px-12 flex-col ">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg">Orders</h4>
                    <SearchInput onSearch={handleSearch} placeholder="Search Orders"/>
                </div>

                <Table columns={columns} data={data}/>

                <>
                    {response.pages &&
                        <Pagination pageCount={response.pages} className="w-full justify-end" onChange={onChangeRadio}
                                    selectedOptionsPage={selectedOptions.page}/>}
                </>
            </div>
        </div>
    );
}