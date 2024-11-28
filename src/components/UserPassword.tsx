import {Container} from "./Container";
import {Input} from "./Input";
import {Button} from "./Button";
import React, {useState} from "react";
import api from "../classes/API";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

export function UserPassword() {
    const user = useSelector((state: RootState) => state.user.data)
    const [password, setPassword] = useState<{ newPassword: string; confirmPassword: string }>({
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('')
    const [alert, setAlert] = useState('');

    function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.currentTarget.value
        const name = event.currentTarget.name

        setPassword((state) => ({
            ...state,
            [name]: val
        }))
    }

    async function resetPassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (password.newPassword === password.confirmPassword && user?.id) {
            await api.updateUserPassword({userId: user.id, newPassword: password.confirmPassword})

            setAlert('Passwords changed!');
            setError('')

            setTimeout(() => {
                setAlert('');
            }, 2000);

        } else {
            setError('Passwords do not match')
        }
    }


    return (
        <div>
            <Container>
                <form onSubmit={resetPassword} className="flex flex-col max-w-96 w-full">
                    <h5 className="text-[#0E1422] font-semibold text-lg flex items-start mb-12">Change Password</h5>
                    <div className="flex flex-col gap-4 mb-8">
                        <Input onChange={onChangeInput} name="newPassword" inputType={"password"} className="w-full"
                               inputClassName={"w-full"} label={"New password"}
                               placeholder={"Enter Your Password"}/>
                        <Input onChange={onChangeInput} name="confirmPassword" inputType={"password"} className="w-full"
                               inputClassName={"w-full"} label={"Confirm Password"}
                               placeholder={"Confirm Your Password"}/>
                    </div>

                    <div className="w-full flex items-center justify-center mb-8">
                        {error && <p className="text-red-600 text-lg">{error}</p>}
                    </div>

                    <Button title="Change password" className=" mb-8"/>

                </form>
            </Container>

            {alert && (
                <div
                    className="falling-alert fixed top-12 left-1/2 transform -translate-x-1/2 bg-white text-green-600 text-xl rounded-md shadow-xl animate-fall w-96 h-32 flex items-center justify-center">
                    {alert}
                </div>
            )}
        </div>
    );
}