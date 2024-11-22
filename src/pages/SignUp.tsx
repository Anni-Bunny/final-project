import {BreadCrumb} from "../components/BreadCrumb";
import React from "react";
import {Container} from "../components/Container";
import {Button} from "../components/Button";
import {Link} from "react-router-dom";
import {Input} from "../components/Input";

export function SignUp() {

    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "Sign up",
            url: ""
        }
    ]

    return (
        <div>
            <section className="bg-[#F6F6F6] py-8">
                <Container>
                    <div className="flex flex-col gap-2 p-3">
                        <h3 className="text-2xl font-bold text-[#0E1422]">Sign up</h3>
                        <BreadCrumb containerClassName="ml-0 w-full" links={links}/>
                    </div>
                </Container>
            </section>

            <Container>
                <div className="my-32 flex flex-col items-center justify-center max-w-96 w-full mx-auto">
                    <Button title="Continue with Google" icon={"coloredIcons/google"} iconPosition={"start"} type={"whiteBtn"} className={"mb-8 w-96"}/>
                    <div className="flex items-center justify-between w-full mb-8">
                        <hr className="border-t border-[#E6E7E8] my-4 align-middle w-2/5 "/>
                        <p className="text-[#5C5F6A] text-sm">OR</p>
                        <hr className="border-t border-[#E6E7E8] my-4 align-middle w-2/5"/>
                    </div>
                    <div className="w-full flex flex-col gap-4 mb-4">
                        <Input inputType={"text"} inputClassName={"w-full"} label={"Name"} placeholder={"Enter Your Name"}/>
                        <Input inputType={"email"} inputClassName={"w-full"} label={"Email"} placeholder={"Enter Your Email"}/>
                        <Input inputType={"password"} inputClassName={"w-full"} label={"Password"} placeholder={"Enter Your Password"}/>
                    </div>

                    <Link to={""} className="w-full"><p className="flex justify-end text-sm text-[#5C5F6A] font-medium mb-8">By creating an account you agree with our Terms of Service and Privacy</p></Link>
                    <Button title="Create account" className="w-full mb-8"/>
                    <Link to={"/login"} className="flex justify-center text-[#5C5F6A]"><span className="text-sm">Already have an account? Log in</span></Link>

                </div>
            </Container>

        </div>
    );
}