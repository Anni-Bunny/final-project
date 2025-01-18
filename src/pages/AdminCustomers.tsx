import {BreadCrumb} from "../components/BreadCrumb";
import React, {ReactNode, useEffect, useState} from "react";
import {renponse} from "../interfaces/response";
import api from "../classes/API";
import {topFunction} from "../Helpers/functions";
import {Icon} from "../components/Icon";
import {Pagination} from "../components/Pagination";
import Table from "../components/Table"
import {TableSearchInput} from "../components/TableSearchInput";

interface Data {
    image: ReactNode,
    name: string,
    email: string,
    shippingAddress: string,
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

export function AdminCustomers() {
    let links = [
        {
            name: "Admin",
            url: "/admin/dashboard"
        },
        {
            name: "Customers",
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
        async function getReviews() {
            const response = await api.getUsers({_page: selectedOptions.page, _per_page: 6});
            setResponse(response);

            const updatedData = response.data.map((item: any) => ({
                image: <div
                    className="w-12 h-12 flex items-center justify-center bg-[#F0F1FF] rounded-full px-[0.906rem] py-[0.719rem] text-[#0070F3] font-semibold">{item.name.firstname[0]}{item.name.lastname[0]}</div>,
                name: <>{item.name.firstname} {item.name.lastname}</>,
                email: item.email,
                shippingAddress: <>{item.address?.number} {item.address?.street}, {item.address?.city}, {item.address?.state}</> ,
                action: "...",
            }));

            setData(() => updatedData);

            topFunction()
        }

        getReviews();

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
        {Header: 'Name', accessor: 'name'},
        {Header: 'Email', accessor: 'email'},
        {Header: 'Shipping Adress', accessor: 'shippingAddress'},
        {Header: 'action', accessor: 'action'},
    ];

    return (
        <div className='flex flex-col gap-16 h-full'>
            <BreadCrumb isInContainer={false} className="" links={links}/>

            <div className="max-h-[45rem] h-full bg-white py-6 px-12 flex-col relative">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg">Customers</h4>
                    <TableSearchInput placeholder="Search Customers"/>
                </div>

                <Table columns={columns} data={data}/>

                <div className="absolute bottom-10 right-12">
                    {response.pages &&
                        <Pagination pageCount={response.pages} className="w-full justify-end" onChange={onChangeRadio}
                                    selectedOptionsPage={selectedOptions.page}/>}
                </div>
            </div>
        </div>
    );
}