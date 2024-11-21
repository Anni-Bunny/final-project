import {Link} from "react-router-dom";
import {Icon} from "./Icon";
import {Container} from "./Container";
import {CartDropDown} from "./CartDropDown";

export function Header() {
    return (
        <Container className="h-20 border-b border-[#F6F6F6] bg-white flex justify-center items-center">
            <header className="h-11 flex justify-between w-full">
                <div className="flex gap-32 py-0.5 items-center">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/images/ecommerceLogo.svg" alt="Ecommerce logo"/>
                        <h1 className="font-bold">Ecommerce</h1>
                    </Link>
                    <div className="flex gap-8">
                        <Link to="/">Home</Link>
                        <Link to={"/categories"} className="flex gap-1">Categories <Icon name={"chevronDown"}/></Link>
                        <Link to={"/about"}>About</Link>
                        <Link to={"/contact"}>Contact</Link>
                    </div>
                </div>
                <div className="flex gap-8 h-11 items-center justify-between">
                    <div className="flex border border-1 rounded-md gap-2 px-4 py-2.5 h-11 items-center w-72">
                        <Icon name="search"/>
                        <input type="search" className="h-6 outline-none"/>
                    </div>
                    <CartDropDown/>
                    <Icon name="user-1"/>
                </div>
            </header>
        </Container>
)
    ;
}