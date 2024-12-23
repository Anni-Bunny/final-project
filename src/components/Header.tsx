import {Link} from "react-router-dom";
import {Container} from "./Container";
import {CartDropDown} from "./CartDropDown";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import React, {useEffect, useState} from "react";
import {Button} from "./Button";
import {Dropdown} from "./DropDown";
import {Logout} from "./Logout";
import {SearchInput} from "./SearchInput";
import api from "../classes/API";
import {category} from "../interfaces/category";

export function Header() {
    const user = useSelector((state: RootState) => state.user.data)
    const [categories, setCategories] = useState<category[]>([])

    useEffect(() => {
        async function getCategories() {
            const categoriesRequest = await api.getCategories();
            if (categoriesRequest) {
                setCategories(categoriesRequest);
            }
        }
        getCategories();
    }, []);

    return (
        <Container className="h-20 border-b border-[#F6F6F6] bg-white flex justify-center items-center">
            <header className="h-11 flex justify-between w-full">
                <div className="flex gap-32 py-0.5 items-center">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/images/ecommerceLogo.svg" alt="Ecommerce logo"/>
                        <h1 className="font-bold">Ecommerce</h1>
                    </Link>
                    <div className="flex gap-8 items-center text-[#5C5F6A]">
                        <Link to="/" className="hover:text-black">Home</Link>

                        <Dropdown
                            title="Categories"
                            icon="chevronDown"
                            titleClassName="font-normal text-#5C5F6A invert-0 group-hover:text-black"
                            child2={
                            <ul className="p-4 w-44 text-[#0E1422] flex flex-col gap-2">
                                {
                                    categories.map((category, index) => (
                                            <Link to={`/products?category=${category.id}`} key={index} className="hover:font-bold" >
                                                <li key={index}>{category.name}</li>
                                            </Link>
                                        )
                                    )
                                }
                            </ul>
                            }
                            child2ClassName="left-4"
                        />

                        <Link to={"/about"} className="hover:text-black">About</Link>
                        <Link to={"/contact"} className="hover:text-black">Contact</Link>
                    </div>
                </div>
                <div className="flex gap-4 h-11 items-center justify-between">

                    <SearchInput/>
                    <CartDropDown/>

                    {
                        user ?
                            (
                                <div>
                                    <Dropdown
                                        icon="user-1"
                                        child2={
                                            <div className="py-2 w-28">
                                                <Link to={"/profile"}><Button title="Profile"
                                                                              type={"whiteSmallBtn"}/></Link>
                                                <Logout/>
                                            </div>
                                        }
                                        child2ClassName="right-2"
                                    />
                                </div>
                            )
                            :
                            (
                                <div className="flex h-11 items-center justify-between">
                                    <Link to={"/login"}><Button title="Login" type={"whiteSmallBtn"}/></Link>
                                    <Link to={"/signup"}><Button title="Signup" type={"whiteSmallBtn"}/></Link>
                                </div>
                            )
                    }
                </div>
            </header>
        </Container>
    )
        ;
}