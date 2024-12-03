import React from 'react';
import { AdminSideBar } from '../components/AdminSideBar';
import {useLocation} from "react-router-dom";

const nonAdminSideBarPages = [`/admin/login`]

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const currentPage = useLocation()
    const displayAdminSideBar = ! nonAdminSideBarPages.includes(currentPage.pathname)
    const isAdminRoute = currentPage.pathname.startsWith('/admin');

    return (
        <div>
            <div className="admin-layout flex h-screen">
                {isAdminRoute && displayAdminSideBar && <AdminSideBar />}
                <main className="bg-[#F6F6F6] w-full p-12">{children}</main>
            </div>
        </div>
    );
}