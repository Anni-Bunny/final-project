import {NotificationBar} from "../components/NotificationBar";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {BreadCrumb} from "../components/BreadCrumb";

export function Products() {
    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "Products",
            url: "/products"
        }
    ]

    return (
        <div>
            <NotificationBar/>
            <Header/>
            <BreadCrumb links={links}/>

            <Footer displayNewsLetter={true}/>
        </div>
    );
}