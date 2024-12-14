import {BreadCrumb} from "../components/BreadCrumb";
import React, {ReactNode, useEffect, useState} from "react";
import {Icon} from "../components/Icon";
import {Button} from "../components/Button";
import Table from "../components/Table";
import api from "../classes/API";
import {topFunction} from "../Helpers/functions";
import {renponse} from "../interfaces/response";
import {order} from "../interfaces/order";
import {useNavigate} from "react-router-dom";
import {product} from "../interfaces/product";
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

interface Data {
    image: ReactNode,
    date: string,
    total: string | number,
    status: string,
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


export function AdminDashboard() {
    const [data, setData] = useState<Data[]>([])
    const [response, setResponse] = useState<renponse>(defaultResponse)
    const [BestSellers, setBestSellers] = useState<product[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getOrders() {
            const response = await api.getOrders({_page: 1, _per_page: 4});
            setResponse(response);

            let updatedData: Data[] = []

            response.data.forEach((order: order) => {
                let totalPrice = 0;

                order.products.forEach((product) => (
                    totalPrice += product.price
                ))

                const images = order.products.map((item, index) => (
                    <img
                        key={index}
                        className="bg-[#F6F6F6] w-12 bg-cover rounded-full"
                        src={item.image}
                        alt=""
                    />
                ));

                updatedData.push({
                    image: <div className="flex gap-2"> {images} </div>,
                    date: order.createdAt,
                    total: totalPrice,
                    status: order.status
                })
            })

            setData(() => updatedData);
        }

        async function getBestSellers() {
            const bestSellers = await api.getProducts({_sort: "-score", _per_page: 3, _page:1});
            if (bestSellers)
                setBestSellers(bestSellers.data);
        }

        getOrders();
        getBestSellers();

        topFunction()
    }, []);


    let links = [
        {
            name: "Admin",
            url: "/admin/dashboard"
        },
        {
            name: "Dashboard",
            url: ""
        }
    ]

    const columns: { Header: ReactNode, accessor: keyof Data }[] = [
        {Header: 'Image', accessor: 'image'},
        {Header: 'Date', accessor: 'date'},
        {Header: 'Total', accessor: 'total'},
        {Header: 'Status', accessor: 'status'},
    ];

    function ViewAllOrders() {
        navigate('/admin/Orders')
    }

    const [chartDataSet, setChartDataSet] = useState(            {
        data: [300, 50, 100],
        backgroundColor: ['#4078FF', '#A8B2FF', '#638fcd'],
        hoverBackgroundColor: ['#FF6347', '#ff835d', '#FFD700'],
    });

    const chartData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            chartDataSet
        ],
    };

    return (
        <div className='flex flex-col gap-10 h-full'>
            <div className="flex items-center justify-between">
                <BreadCrumb isInContainer={false} className="" links={links}/>
                <Icon name="logOut"/>
            </div>

            <div className="flex flex-col max-h-[48rem] h-full gap-8">
                <div className="flex gap-10 h-1/3">
                    <div className="bg-white border border-[#E9E9EB] rounded-lg h-full w-1/3"></div>

                    <div className="w-2/3 flex gap-10">
                        <div className="bg-white border border-[#E9E9EB] rounded-lg h-full w-full"></div>
                        <div className="bg-white border border-[#E9E9EB] rounded-lg h-full w-full"></div>
                    </div>
                </div>

                <div className="flex gap-10 h-2/3">
                    <div
                        className="w-1/3 bg-white h-full border border-[#E9E9EB] rounded-lg p-8 gap-6 flex flex-col">
                        <div className="flex flex-col gap-2 pb-6 border-b">
                            <h4 className="text-lg font-semibold">Best Selling</h4>
                            <p className="text-sm font-medium text-[#5C5F6A]">THIS MONTH</p>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-bold">$2,400</h3>
                                <span className=" text-[#5C5F6A] font-medium">- Total Sales</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                {
                                    BestSellers.map((product, index) =>
                                        <span key={index} className="rounded-2xl border py-1 px-4 text-[#5C5F6A] max-w-max">{product.name} - <span className="text-[#0E1422] font-semibold">${chartDataSet.data[index]}</span></span>
                                    )
                                }
                            </div>

                            <div className="max-w-24">
                                <Doughnut data={chartData} />
                            </div>

                        </div>
                    </div>

                    <div className="w-2/3 bg-white h-full border border-[#E9E9EB] rounded-lg flex flex-col p-8 gap-1">
                        <div className="flex items-center gap-4 pb-5 border-b">
                            <h5 className="font-semibold text-lg">Recent Orders</h5>
                            <Button title="View All" type="whiteLightRoundedBtn" className="bg-[#F6F6F6] border-none"
                                    onClick={ViewAllOrders}/>
                        </div>

                        <Table columns={columns} data={data}/>
                    </div>
                </div>
            </div>
        </div>
    );
}