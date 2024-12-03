import {BreadCrumb} from "../components/BreadCrumb";
import React from "react";

export function AdminDashboard() {
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

    return (
       <>
           <BreadCrumb isInContainer={false} className="" links={links}/>
       </>
    );
}