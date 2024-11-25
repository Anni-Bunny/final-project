import {Tabs, TabSwitcher} from "../components/TabSwitcher";
import {Container} from "../components/Container";
import {BreadCrumb} from "../components/BreadCrumb";
import React from "react";
import {UserOrders} from "../components/UserOrders";
import {UserAdress} from "../components/UserAdress";
import {UserPassword} from "../components/UserPassword";
import {UserAccountDetails} from "../components/UserAccountDetails";
import {WishList} from "../components/WishList";
import {Logout} from "../components/Logout";

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
            component: <UserOrders/>
        },
        {
            name: 'wishlist',
            component: <WishList/>
        },
        {
            name: 'address',
            component: <UserAdress/>
        },
        {
            name: 'password',
            component: <UserPassword/>
        },
        {
            name: 'accountDetail',
            component: <UserAccountDetails/>
        },
        {
            name: 'logout',
            component: <Logout/>
        },

    ];

    const btnDivClassName: string = "border-r pr-10"
    const contentClassName:string = "max-w-[60rem] px-10"
    const containerClassName:string = "pt-20 items-center"



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
                btnDivClassName={btnDivClassName}
                type="horizontal"
                contentClassName={contentClassName}
                containerClassName={containerClassName}
                btnType="LightGrayBtn"
                iconPosition={"start"}
            />
        </>

)
    ;
}
