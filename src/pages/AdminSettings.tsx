import {BreadCrumb} from "../components/BreadCrumb";
import {SearchInput} from "../components/SearchInput";
import Table from "../components/Table";
import {Pagination} from "../components/Pagination";
import React from "react";
import {Input} from "../components/Input";
import {Button} from "../components/Button";
import {Icon} from "../components/Icon";

export function AdminSettings() {
    let links = [
        {
            name: "Admin",
            url: "/admin/dashboard"
        },
        {
            name: "Settings",
            url: ""
        }
    ]

    return (
        <div className='flex flex-col gap-16 h-full'>
            <div className="flex items-center justify-between">
                <BreadCrumb isInContainer={false} className="" links={links}/>
                <Icon name="logOut"/>
            </div>


            <div className="max-h-[45rem] h-full bg-white flex gap-16 flex-col ">
                <h4 className="text-lg border-b p-8">Settings</h4>

                <form
                    className="flex flex-col max-w-96 w-full p-8">

                    <div className="w-full flex flex-col gap-4 mb-10">
                        <Input required={true} name="siteName"
                               inputType={"email"} inputClassName={"w-full"}
                               label={"Site Name"}
                        />
                        <Input required={true} name="supportEmail"
                               inputType={"password"} inputClassName={"w-full"}
                               label={"Support Email"}
                        />
                        <Input required={true} name="monthlyOrderGoal"
                               inputType={"password"} inputClassName={"w-full"}
                               label={"Monthly Order Goal"}
                        />
                    </div>

                    <Button title={"Save Changes"} className="w-40"/>
                </form>
            </div>
        </div>
    );
}