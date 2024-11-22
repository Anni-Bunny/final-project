import {BreadCrumb} from "../components/BreadCrumb";
import React from "react";
import {Container} from "../components/Container";
import {Button} from "../components/Button";
import {Link} from "react-router-dom";
import {Input} from "../components/Input";

export function ResetPassword() {

    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "Reset Password",
            url: ""
        }
    ]

    return (
        <div>
            <section className="bg-[#F6F6F6] py-8">
                <Container>
                    <div className="flex flex-col gap-2 p-3">
                        <h3 className="text-2xl font-bold text-[#0E1422]">Reset Password</h3>
                        <BreadCrumb containerClassName="ml-0 w-full" links={links}/>
                    </div>
                </Container>
            </section>

            <Container>
                <div className="my-32 flex flex-col items-center justify-center max-w-96 w-full mx-auto">
                    <Input inputType={"password"} className="w-full mb-6" inputClassName={"w-full"} label={"New password"}
                           placeholder={"Enter Your Password"}/>

                    <Input inputType={"password"} className="w-full mb-6" inputClassName={"w-full"} label={"Confirm password"}
                           placeholder={"Enter Your Email"}/>

                    <Link to={"/resetPassword"} className="w-full"><Button title="Send reset link" className="w-full mb-8"/></Link>

                </div>
            </Container>

        </div>
    );
}