import {Tabs, TabSwitcher} from "../components/TabSwitcher";
import {Container} from "../components/Container";
import {BreadCrumb} from "../components/BreadCrumb";
import React from "react";

export function Profile() {

    const tabs: Tabs = [
        {name: 'orders', title: 'Orders', icon: 'cart', textPosition: 'start'},
        {name: 'wishlist', title: 'Wishlist', icon: 'heart', textPosition: 'start'},
        {name: 'address', title: 'Address', icon: 'delivery', textPosition: 'start'},
        {name: 'password', title: 'Password', icon: 'key', textPosition: 'start'},
        {name: 'accountDetail', title: 'Account Detail', icon: 'user-1', textPosition: 'start'},
        {name: 'logout', title: 'Logout', icon: 'logout', textPosition: 'start'},
    ];

    const content = [
        {
            name: 'orders',
            component: <></>
        },
        {
            name: 'wishlist',
            component: <></>
        },
        {
            name: 'address',
            component: <></>
        },
        {
            name: 'password',
            component: <></>
        },
        {
            name: 'accountDetail',
            component: <></>
        },
        {
            name: 'logout',
            component: <></>
        },

    ];

    const containerClassName: string = "gap-[2rem]"
    const contentClassName:string = "max-w-[54rem]"


    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "My Account",
            url: ""
        }
    ]

    return (
        <>
            <section className="bg-[#F6F6F6] py-8">
                <Container>
                    <div className="flex flex-col gap-2 p-3">
                        <h3 className="text-2xl font-bold text-[#0E1422]">My Account</h3>
                        <BreadCrumb containerClassName="ml-0 w-full" links={links}/>
                    </div>
                </Container>
            </section>

            <TabSwitcher
                tabs={tabs}
                content={content}
                containerClassName={containerClassName}
                type="horizontal"
                contentClassName={contentClassName}
                btnType="LightGrayBtn"
                iconPosition={"start"}
            />
        </>

)
    ;
}
