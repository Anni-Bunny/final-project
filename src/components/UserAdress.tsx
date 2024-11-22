import {Container} from "./Container";
import {Input} from "./Input";
import React from "react";
import {Button} from "./Button";

export function UserAdress() {
    return (
        <Container>
            <div className="mt-14 mb-32 flex justify-between w-full">
                <div className="w-3/5 pr-40">
                    <h5 className="text-[#0E1422] font-semibold text-lg py-4 mb-16">Shipping Address</h5>

                    <div className="flex flex-col gap-4">
                        <Input inputType={"text"} label={"Street Address"} inputClassName={"w-full"}
                               placeholder={"Enter Your Street Address"}/>

                        <div className="grid grid-cols-2 gap-4  ">
                            <Input inputType={"text"} inputClassName={"w-full"} label={"City"}
                                   placeholder={"Enter Your City"}/>
                            <Input inputType={"text"} inputClassName={"w-full"} label={"State"}
                                   placeholder={"Enter Your State"}/>
                            <Input inputType={"text"} inputClassName={"w-full"} label={"Zip Code"}
                                   placeholder={"Enter Zip Code"}/>
                            <Input inputType={"text"} inputClassName={"w-full"} label={"Country"}
                                   placeholder={"Enter Your Country"}/>
                        </div>
                    </div>

                    <Button title={"Save Changes"}/>
                </div>
            </div>
        </Container>
    );
}