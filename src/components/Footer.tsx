import {NewsLetter} from "./NewsLetter";
import {Container} from "./Container";
import {Icon} from "./Icon";
import {Link} from "react-router-dom";

interface FooterProps{
    displayNewsLetter?:boolean
}

export function Footer({displayNewsLetter=false}: FooterProps) {
    return (
        <footer className={`flex flex-col ${(displayNewsLetter)?"bg-white gap-[4.625rem]": "bg-[#F6F6F6] pt-[4.625rem]"}`}>
            {
                (displayNewsLetter)? <NewsLetter/> : null
            }
            <Container className={`flex-col gap-[6.5rem]`}>
                <div className="flex justify-between w-full">
                    <div className="flex flex-col h-40 w-[17rem]">
                        <div className="flex h-11 items-center py-2.5 gap-4 mb-3">
                            <img src="/images/logo2.svg" alt="Ecommerce logo"/>
                            <h1 className="text-xl font-extrabold text-[#0E1422]">Ecommerce</h1>
                        </div>
                        <p className="text-[#5C5F6A] mb-8">DevCut is a YouTube channel for practical project-based learning.</p>
                        <div className="flex gap-6">
                            <Icon name="/socialIcons/github"/>
                            <Icon name="/socialIcons/instagram"/>
                            <Icon name="/socialIcons/youtube"/>
                        </div>
                    </div>

                    <div className="flex text-sm font-medium text-[#878A92] gap-[4.5rem]">
                        <div className="flex flex-col gap-10">
                            <p>SUPPORT</p>
                            <div className="flex flex-col gap-4">
                                <Link to={""}>FAQ</Link>
                                <Link to={""}>Terms of use</Link>
                                <Link to={""}>Privacy Policy</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-10">
                            <p>COMPANY</p>
                            <div className="flex flex-col gap-4">
                                <Link to={""}>About us</Link>
                                <Link to={""}>Contact</Link>
                                <Link to={""}>Careers</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-10">
                            <p>SHOP</p>
                            <div className="flex flex-col gap-4">
                                <Link to={""}>My Account</Link>
                                <Link to={""}>Checkout</Link>
                                <Link to={""}>Cart</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10">
                        <p className="text-sm text-[#878A92]">ACCEPTED PAYMENTS</p>
                        <div className="flex">
                            <Icon className="h-8 w-[1.877]" name="/coloredIcons/mastercard"/>
                            <Icon className="h-8 w-14" name="/coloredIcons/amex"/>
                            <Icon className="h-8 w-[2.625rem]" name="/coloredIcons/visa"/>
                        </div>
                    </div>
                </div>
                <div className="py-[1.688rem] flex w-full items-center justify-center border-t border-[#F6F6F6]">
                    <p className="text-sm">© 2023 DevCut. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
}