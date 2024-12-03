import React from 'react';
import {Footer} from "../components/Footer";
import { Header } from '../components/Header';
import { NotificationBar } from '../components/NotificationBar';
import ScrollToTop from '../components/ScrollToTop';
import {useLocation} from "react-router-dom";

const nonNewsLetterPages = ['/shoppingCart']

export function MainLayout({ children }: { children: React.ReactNode }) {

    const currentPage = useLocation()
    const displayNewsLetter = ! nonNewsLetterPages.includes(currentPage.pathname)

    return (
        <div>
            <NotificationBar />
            <Header />
            <ScrollToTop />
            <main>{children}</main>
            <Footer displayNewsLetter={displayNewsLetter} />
        </div>

    )
}