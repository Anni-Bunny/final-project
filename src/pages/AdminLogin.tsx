import React, {useEffect, useState} from "react";
import {Container} from "../components/Container";
import {Button} from "../components/Button";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "../components/Input";
import {login, userLoginForm} from "../store/slices/userSlice";
import api from "../classes/API";


export function AdminLogin() {

    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState<userLoginForm>({email: 'animaghradze@gmail.com', password: '123'})
    const [error, setError] = useState('')


    function updateForm(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.currentTarget.name
        const value = event.currentTarget.value

        setLoginForm((state) => ({
            ...state,
            [name]: value
        }))
    }

    async function loginAdmin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const response = await api.getAdmins(loginForm)
        const loginAdmin = response[0]
        if (loginAdmin) {
            navigate('/admin/dashboard')

        } else {
            setError('Email or password is wrong')
        }
    }


    return (
        <div className="flex h-screen ">
            <Container>
                <form onSubmit={loginAdmin}
                    className="flex flex-col items-center justify-center max-w-96 w-full mx-auto border border-[#E9E9EB] rounded-lg p-8">

                    <div className="flex items-center justify-center gap-2 w-full mb-16">
                        <img src="/images/ecommerceLogo.svg" alt="Ecommerce logo"/>
                        <h3 className="text-[#5C5F6A] text-xl font-bold">Admin</h3>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        {error && <p className="text-red-600 text-lg">{error}</p>}
                    </div>
                    <div className="w-full flex flex-col gap-4 mb-10">
                        <Input required={true} onChange={updateForm} name="email"
                               inputType={"email"} inputClassName={"w-full"}
                               label={"Email"}
                        />
                        <Input required={true} onChange={updateForm} name="password"
                               inputType={"password"} inputClassName={"w-full"}
                               label={"Password"}
                        />
                    </div>

                    <Button title="Login" className="w-full mb-16"/>
                </form>
            </Container>

        </div>
    );
}