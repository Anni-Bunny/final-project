import {NotificationBar} from "../components/NotificationBar";
import React from "react";
import {Header} from "../components/Header";
import api from "../classes/API";
import {Container} from "../components/Container";
import {Button} from "../components/Button";
import {Card} from "../components/Card";

export function Homepage() {

    api.getProducts()

    return (
        <div>
            <NotificationBar/>
            <Header/>
            <section className="h-[27.5rem] bg-[#F6F6F6]">
                <Container className="h-full justify-between">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-[0.75rem]">
                            <h1 className="font-bold text-[2rem]">Fresh Arrivals Online</h1>
                            <p className="text-[0.875rem]">Discover Our Newest Collection Today.</p>
                        </div>
                        <div>
                            <Button name={"arrowRight"} title={"View Collection"}/>
                        </div>
                    </div>
                    <div>
                        <div className="rounded-full h-80 w-80 bg-[#E9E9EB] flex relative ">
                            <img className="h-[2.375rem] absolute top-0 left-0" src="/images/homepageSection1Star.png" alt="star"/>
                            <img className="h-[23.75rem] absolute right-0" src="/images/homepageSection1.png" alt="photo"/>
                        </div>
                    </div>
                </Container>
            </section>
            <section className="pt-20 pb-[4.5rem]">
                <Container className="h-[16.625rem] justify-between">
                    <Card name={"delivery"} heading={"Free Shipping"} paragraph={"Upgrade your style today and get FREE shipping on all orders! Don't miss out."}/>
                    <Card name={"starBadge"} heading={"Satisfaction Guarantee"} paragraph={"Shop confidently with our Satisfaction Guarantee: Love it or get a refund."}/>
                    <Card name={"shieldCheck"} heading={"Secure Payment"} paragraph={"Your security is our priority. Your payments are secure with us."}/>
                </Container>
            </section>
        </div>


    );
}