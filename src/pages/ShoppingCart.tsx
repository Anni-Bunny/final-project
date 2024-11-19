import {NotificationBar} from "../components/NotificationBar";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {BreadCrumb} from "../components/BreadCrumb";
import React from "react";
import {Container} from "../components/Container";

export function ShoppingCart() {
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

    return (
        <div>
            <NotificationBar/>

            <Header/>

            <section className="bg-[#F6F6F6] py-8">
                <Container>
                    <div className="flex flex-col gap-2 p-3">
                        <h3 className="text-2xl font-bold text-[#0E1422]">Cart</h3>
                        <BreadCrumb containerClassName="mx-0" className=" my-0 px-0 py-0 " links={links}/>
                    </div>
                </Container>
            </section>

            <Container>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
            </Container>


            <Footer/>
        </div>
    );
}