import {BreadCrumb} from "../components/BreadCrumb";
import React, {useState} from "react";
import {Container} from "../components/Container";
import {Button} from "../components/Button";
import {useNavigate} from "react-router-dom";
import {Input} from "../components/Input";
import api from "../classes/API";

export function ForgotPassword() {
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState('')

    const navigate = useNavigate();
    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "Forgot Password",
            url: ""
        }
    ]

    function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.currentTarget.value

        setEmail(val)
    }

    async function sendResetLink(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const response = await api.getUsers({email: email})
        const user = response[0];
        if (user){
            navigate('/resetPassword/'+user.id);
        } else {
            setError('Email is wrong')
        }
    }

    return (
        <div>
            <section className="bg-[#F6F6F6] py-8">
                <Container>
                    <div className="flex flex-col gap-2 p-3">
                        <h3 className="text-2xl font-bold text-[#0E1422]">Forgot Password</h3>
                        <BreadCrumb containerClassName="ml-0 w-full" links={links}/>
                    </div>
                </Container>
            </section>



            <Container>
                <form onSubmit={sendResetLink}
                      className="my-32 flex flex-col items-center justify-center max-w-96 w-full mx-auto">

                    <div className="w-full flex items-center justify-center mb-8">
                        {error && <p className="text-red-600 text-lg">{error}</p>}
                    </div>

                    <p className="flex justify-end text-sm text-[#555555] font-medium mb-8">Please enter the email
                        address associated with your account. We'll promptly send you a link to
                        reset your password.</p>

                    <Input onChange={onChangeInput} name="email" inputType={"email"} className="w-full mb-6"
                           inputClassName={"w-full"} label={"Email"}
                           placeholder={"Enter Your Email"}/>

                    <Button title="Send reset link" className="w-full mb-8"/>
                </form>
            </Container>

        </div>
    );
}