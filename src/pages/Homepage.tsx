import {NotificationBar} from "../components/NotificationBar";
import React from "react";
import {Header} from "../components/Header";
import api from "../classes/API";

export function Homepage() {

    api.getProducts()

    return (
        <div>
            <NotificationBar/>
            <Header/>
            <section>
                <div className="container">
                    <div>
                        <h1>Fresh Arrivals Online</h1>
                        <p>Discover Our Newest Collection Today.</p>
                        <button></button>
                    </div>

                    <div>

                    </div>
                </div>
            </section>
        </div>


    );
}