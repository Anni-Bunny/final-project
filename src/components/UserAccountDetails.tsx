import {Container} from "./Container";
import {Input} from "./Input";
import {Link} from "react-router-dom";
import {Button} from "./Button";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import api from "../classes/API";
import {login} from "../store/slices/userSlice";

export interface details {
    firstname: string,
    lastname: string,
    email: string,
}

export function UserAccountDetails() {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.data)
    const [alert, setAlert] = useState('');

    const [newDetails, setNewDetails] = useState<details>({
        firstname: "",
        lastname: "",
        email: ""
    });


    function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.currentTarget.value
        const name = event.currentTarget.name

        setNewDetails((state) => ({
            ...state,
            [name]: val
        }))
    }

    async function resetDetails(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (user?.id) {
            const response = await api.updateUserDetails({userId: user.id, newDetails: newDetails})

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
                <form onSubmit={resetDetails} className="flex flex-col max-w-96 w-full">
                    <h5 className="text-[#0E1422] font-semibold text-lg flex items-start mb-12">Account Details</h5>
                    <div
                        className="w-12 h-12 flex items-center justify-center bg-[#F0F1FF] rounded-full px-[0.906rem] py-[0.719rem] text-[#0070F3] font-semibold mb-8">
                        {user?.name?.firstname[0]}{user?.name?.lastname[0]}
                    </div>
                    <div className="flex flex-col gap-4 mb-16">
                        <Input onChange={onChangeInput} name={"firstname"} inputType={"text"} className="w-full"
                               inputClassName={"w-full"} label={"First name"}
                               placeholder={"Enter Your First name"}/>
                        <Input onChange={onChangeInput} name={"lastname"} inputType={"text"} className="w-full"
                               inputClassName={"w-full"} label={"Last name"}
                               placeholder={"Enter Your Last name"}/>
                        <Input onChange={onChangeInput} name={"email"} inputType={"email"} className="w-full"
                               inputClassName={"w-full"} label={"Email"}
                               placeholder={"Enter Your Email"}/>
                    </div>

                    <Button title="Save Changes" className=" mb-8"/>

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