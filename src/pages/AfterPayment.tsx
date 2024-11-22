import {BreadCrumb} from "../components/BreadCrumb";
import React from "react";
import {Container} from "../components/Container";
import {Button} from "../components/Button";
import {Link} from "react-router-dom";

export function AfterPayment() {

    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "Successful Order",
            url: ""
        }
    ]

    return (
        <div>
            <section className="bg-[#D5E5D7] py-8">
                <Container>
                    <div className="flex flex-col gap-2 p-3">
                        <h3 className="text-2xl font-bold text-[#0E1422]">Successful Order</h3>
                        <BreadCrumb containerClassName="ml-0 w-full" links={links}/>
                    </div>
                </Container>
            </section>

            <Container>
                <div className="my-40 flex flex-col items-center justify-center w-full">
                    <img src="/images/successfulOrder.png" alt="successfulOrder" className="mb-5"/>
                    <h3 className="font-bold text-2xl text-[#0E1422] mb-4">Thank you for shopping</h3>
                    <p className="font-normal text-sm text-[#5C5F6A] max-w-96 text-center mb-12">Your order has been successfully placed and is now being processed.</p>
                    <Link to={"/profile"}><Button title={"Go to my account"} icon={"arrowRight"}/></Link>
                </div>
            </Container>

        </div>
    );
}