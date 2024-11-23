import {Container} from "./Container";
import {Input} from "./Input";
import {Link} from "react-router-dom";
import {Button} from "./Button";
import React from "react";

export function UserAccountDetails() {
    return (
        <Container>
            <div className="flex flex-col max-w-96 w-full">
                <h5 className="text-[#0E1422] font-semibold text-lg flex items-start mb-12">Account Details</h5>
                <div
                    className="w-12 h-12 flex items-center justify-center bg-[#F0F1FF] rounded-full px-[0.906rem] py-[0.719rem] text-[#0070F3] font-semibold mb-8">AM</div>
                <div className="flex flex-col gap-4 mb-16">
                    <Input inputType={"text"} className="w-full" inputClassName={"w-full"} label={"Full name"}
                           placeholder={"Enter Your Full name"}/>
                    <Input inputType={"email"} className="w-full" inputClassName={"w-full"} label={"Email"}
                           placeholder={"Enter Your Email"}/>
                </div>

                <Link to={""} className="w-full"><Button title="Save Changes" className=" mb-8"/></Link>

            </div>
        </Container>
    );
}