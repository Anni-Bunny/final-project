import {Container} from "./Container";
import {Input} from "./Input";
import React from "react";
import {Button} from "./Button";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

export function UserAdress() {
    const user = useSelector((state: RootState) => state.user.data)

    return (
        <Container>
            <div className="flex flex-col w-full">

                    <h5 className="text-[#0E1422] font-semibold text-lg py-4 mb-8">Shipping Address</h5>

                    <div className="flex flex-col gap-4 mb-16">
                        <Input value={user?.address?.street} inputType={"text"} label={"Street Address"} inputClassName={"w-full"}/>

                        <div className="grid grid-cols-2 gap-4  ">
                            <Input value={user?.address?.city} inputType={"text"} inputClassName={"w-full"} label={"City"}/>
                            <Input value={user?.address?.state} inputType={"text"} inputClassName={"w-full"} label={"State"}/>
                            <Input value={user?.address?.zipcode} inputType={"text"} inputClassName={"w-full"} label={"Zip Code"}/>
                            <Input value={user?.address?.country} inputType={"text"} inputClassName={"w-full"} label={"Country"}/>
                        </div>
                    </div>

                <div>
                    <Button title={"Save Changes"}/>
                </div>


            </div>
        </Container>
    );
}