import {Link} from "react-router-dom";
import {Icon} from "./Icon";
import {Container} from "./Container";

export function Header() {
    return (
        <header className="h-20 bg-white flex justify-center items-center">
            <Container className="h-11 justify-between">
                <div className="flex gap-32 py-0.5 items-center">
                    <div className="flex items-center gap-3">
                        <img src="/images/ecommerceLogo.svg" alt="Ecommerce logo"/>
                        <h1 className="font-bold">Ecommerce</h1>
                    </div>
                    <div className="flex gap-8">
                        <Link to={""}>Home</Link>
                        <Link to={""}>Categories</Link>
                        <Link to={""}>About</Link>
                        <Link to={""}>Contact</Link>
                    </div>
                </div>
                <div className="flex gap-8 h-11 items-center">
                    <div className="flex border border-1 rounded-md gap-2 px-4 py-2.5 h-11 items-center w-72">
                        <Icon name="search"/>
                        <input type="search" className="h-6 outline-none"/>
                    </div>
                    <Icon name="cart" className="size-"/>
                    <Icon name="user-1"/>
                </div>
            </Container>
        </header>
    );
}