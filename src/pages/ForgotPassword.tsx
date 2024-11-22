import {BreadCrumb} from "../components/BreadCrumb";
import React from "react";
import {Container} from "../components/Container";
import {Button} from "../components/Button";
import {Link} from "react-router-dom";
import {Input} from "../components/Input";

export function ForgotPassword() {

    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "Forgot Password",
            url: ""
        }
    ]

    return (
        <div>
            <section className="bg-[#F6F6F6] py-8">
                <Container>
                    <div className="flex flex-col gap-2 p-3">
                        <h3 className="text-2xl font-bold text-[#0E1422]">Forgot Password</h3>
                        <BreadCrumb containerClassName="ml-0 w-full" links={links}/>
                    </div>
                </Container>
            </section>

            <Container>
                <div className="my-32 flex flex-col items-center justify-center max-w-96 w-full mx-auto">
                    <p className="flex justify-end text-sm text-[#555555] font-medium mb-8">Please enter the email address associated with your account. We'll promptly send you a link to
                        reset your password.</p>

                    <Input inputType={"email"} className="w-full mb-6" inputClassName={"w-full"} label={"Email"}
                           placeholder={"Enter Your Email"}/>

                    <Link to={"/resetPassword"} className="w-full"><Button title="Send reset link" className="w-full mb-8"/></Link>

                </div>
            </Container>

        </div>
    );
}