import {Container} from "./Container";
import {Input} from "./Input";
import {Link} from "react-router-dom";
import {Button} from "./Button";
import React from "react";

export function UserPassword() {
    return (
        <Container>
            <div className="flex flex-col max-w-96 w-full">
                <h5 className="text-[#0E1422] font-semibold text-lg flex items-start mb-12">Change Password</h5>
                <div className="flex flex-col gap-4 mb-16">
                    <Input inputType={"password"} className="w-full" inputClassName={"w-full"} label={"New password"}
                           placeholder={"Enter Your Password"}/>
                    <Input inputType={"password"} className="w-full" inputClassName={"w-full"} label={"Confirm Password"}
                           placeholder={"Confirm Your Password"}/>
                </div>

                <Link to={""} className="w-full"><Button title="Change password" className=" mb-8"/></Link>

            </div>
        </Container>
    );
}