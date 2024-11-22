import {Container} from "./Container";
import {Input} from "./Input";
import {Link} from "react-router-dom";
import {Button} from "./Button";
import React from "react";

export function UserPassword() {
    return (
        <Container>
            <div className="my-32 flex flex-col items-center justify-center max-w-96 w-full mx-auto">
                <h5 className="text-[#0E1422] font-semibold text-lg py-4 mb-16">Change Password</h5>
                <Input inputType={"password"} className="w-full mb-6" inputClassName={"w-full"} label={"New password"}
                       placeholder={"Enter Your Password"}/>
                <Input inputType={"password"} className="w-full mb-6" inputClassName={"w-full"} label={"Confirm Password"}
                       placeholder={"Confirm Your Password"}/>


                <Link to={"/resetPassword"} className="w-full"><Button title="Change password" className="w-full mb-8"/></Link>

            </div>
        </Container>
    );
}