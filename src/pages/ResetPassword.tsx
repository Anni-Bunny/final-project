import {BreadCrumb} from "../components/BreadCrumb";
import React, {useState} from "react";
import {Container} from "../components/Container";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import api from "../classes/API";
import {useNavigate, useParams} from "react-router-dom";

export function ResetPassword() {
    const {id} = useParams()
    const navigate = useNavigate();
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
        if (password.newPassword === password.confirmPassword && id) {
            await api.updateUserPassword({userId: id, newPassword: password.confirmPassword})

            setAlert('Passwords match! Redirecting...');

            setTimeout(() => {
                setAlert('');
                navigate('/'); // Redirect to homepage
            }, 2000);

        } else {
            setError('Passwords do not match')
        }
    }

    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "Reset Password",
            url: ""
        }
    ]

    return (
        <div>
            <section className="bg-[#F6F6F6] py-8">
                <Container>
                    <div className="flex flex-col gap-2 p-3">
                        <h3 className="text-2xl font-bold text-[#0E1422]">Reset Password</h3>
                        <BreadCrumb containerClassName="ml-0 w-full" links={links}/>
                    </div>
                </Container>
            </section>

            <Container>
                <form onSubmit={resetPassword}
                      className="my-32 flex flex-col items-center justify-center max-w-96 w-full mx-auto">
                    <Input onChange={onChangeInput} name="newPassword" inputType={"password"} className="w-full mb-6"
                           inputClassName={"w-full"} label={"New password"}
                           placeholder={"Enter Your Password"}/>

                    <Input onChange={onChangeInput} name="confirmPassword" inputType={"password"}
                           className="w-full mb-6" inputClassName={"w-full"} label={"Confirm password"}
                           placeholder={"Enter Your Email"}/>

                    <div className="w-full flex items-center justify-center mb-8">
                        {error && <p className="text-red-600 text-lg">{error}</p>}
                    </div>

                    <Button title="Reset password" className="w-full mb-8"/>

                </form>
            </Container>

            {alert && (
                <div className="falling-alert fixed top-12 left-1/2 transform -translate-x-1/2 bg-white text-green-600 text-xl rounded-md shadow-xl animate-fall w-96 h-32 flex items-center justify-center">
                    {alert}
                </div>
            )}

        </div>
    );
}