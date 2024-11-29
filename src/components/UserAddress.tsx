import {Container} from "./Container";
import {Input} from "./Input";
import React, {useState} from "react";
import {Button} from "./Button";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store/store";
import {address} from "../interfaces/user";
import api from "../classes/API";
import {login} from "../store/slices/userSlice";


export function UserAddress() {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.data)
    const [alert, setAlert] = useState('');
    const [newAddress, setNewAddress] = useState<address>({
        street: user?.address?.street || "",
        city: user?.address?.city || "",
        state: user?.address?.state || "",
        zipcode: user?.address?.zipcode || "",
        country: user?.address?.country || ""
    });


    function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.currentTarget.value
        const name = event.currentTarget.name

        setNewAddress((state) => ({
            ...state,
            [name]: val
        }))
    }

    async function resetAddress(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (user?.id) {
            const response = await api.updateUserAddress({userId: user.id, newAddress: newAddress})

            if (response) {
                dispatch(login(response))

                setAlert('address changed!');
            }

            setTimeout(() => {
                setAlert('');
            }, 2000);

        }
    }

    return (
        <>
            <Container>
                <form onSubmit={resetAddress} className="flex flex-col w-full">

                    <h5 className="text-[#0E1422] font-semibold text-lg py-4 mb-8">Shipping Address</h5>

                    <div className="flex flex-col gap-4 mb-16">
                        <Input onChange={onChangeInput} value={newAddress.street} name={"street"} inputType={"text"}
                               label={"Street Address"} inputClassName={"w-full"}/>

                        <div className="grid grid-cols-2 gap-4  ">
                            <Input onChange={onChangeInput} value={newAddress.city} name={"city"} inputType={"text"}
                                   inputClassName={"w-full"} label={"City"}/>

                            <Input onChange={onChangeInput} value={newAddress.state} name={"state"} inputType={"text"}
                                   inputClassName={"w-full"} label={"State"}/>

                            <Input onChange={onChangeInput} value={newAddress.zipcode} name={"zipcode"} inputType={"text"}
                                   inputClassName={"w-full"} label={"Zip Code"}/>

                            <Input onChange={onChangeInput} value={newAddress.country} name={"country"} inputType={"text"}
                                   inputClassName={"w-full"} label={"Country"}/>
                        </div>
                    </div>

                    <div>
                        <Button title={"Save Changes"}/>
                    </div>


                </form>
            </Container>

            {alert && (
                <div
                    className="falling-alert fixed top-12 left-1/2 transform -translate-x-1/2 bg-white text-green-600 text-xl rounded-md shadow-xl animate-fall w-96 h-32 flex items-center justify-center">
                    {alert}
                </div>
            )}
        </>
    );
}