import {Tabs} from "./TabSwitcher";
import {Button} from "./Button";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export function AdminSideBar() {
    let navigate = useNavigate();
    const tabs: Tabs = [
        {name: 'dashboard', title: 'Dashboard', icon: 'dashboard', textPosition: 'start'},
        {name: 'products', title: 'Products', icon: 'product', textPosition: 'start'},
        {name: 'orders', title: 'Orders', icon: 'cart', textPosition: 'start'},
        {name: 'customers', title: 'Customers', icon: 'users', textPosition: 'start'},
        {name: 'reviews', title: 'Reviews', icon: 'emptyStar', textPosition: 'start'},
        {name: 'settings', title: 'Settings', icon: 'settings', textPosition: 'start'}
    ];

    const [currentTab, setCurrentTab] = useState<string>(tabs[0].name);

    function onChangePage(event: React.MouseEvent<HTMLButtonElement>) {
        setCurrentTab(event.currentTarget.name);
        navigate(`/admin/${event.currentTarget.name}`)
    }


    return (
        <div className="w-[20rem] flex flex-col items-center gap-16 py-12">
            <div className="flex items-center justify-center gap-2 w-full">
                <img src="/images/ecommerceLogo.svg" alt="Ecommerce logo"/>
                <h3 className="text-[#5C5F6A] text-xl font-bold">Admin</h3>
            </div>

            <div className={`flex flex-col gap-6 text-sm`}>
                {tabs.map((tab) => (
                    <Button
                        key={tab.name}
                        name={tab.name}
                        onClick={onChangePage}
                        type={"LightGrayBtn"}
                        title={tab.title}
                        className={currentTab === tab.name ? 'bg-gray-100' : 'bg-white'}
                        iconPosition={"start"}
                        icon={tab.icon}
                        textPosition={tab.textPosition}
                    />
                ))}
            </div>
        </div>

    );
}