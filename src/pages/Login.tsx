import {BreadCrumb} from "../components/BreadCrumb";
import React, {useEffect, useState} from "react";
import {Container} from "../components/Container";
import {Button} from "../components/Button";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "../components/Input";
import {login, userLoginForm} from "../store/slices/userSlice";
import api from "../classes/API";
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from "../store/store";
import {loadUserCart} from "../store/slices/cartSlice";

export function Login() {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.data)
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState<userLoginForm>({email: 'unikolaus@yahoo.com', password: '123123'})
    const [error, setError] = useState('')

    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "Login",
            url: ""
        }
    ]

    function updateForm(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.currentTarget.name
        const value = event.currentTarget.value

        setLoginForm((state) => ({
            ...state,
            [name]: value
        }))
    }

    async function loginUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const response = await api.getUsers(loginForm)
        const loginUser = response[0]
        if (loginUser) {
            dispatch(login(loginUser))

            const response = await api.getCarts({userId: loginUser.id})
            const userCart = response[0]

            dispatch(loadUserCart(userCart))

        } else {
            setError('Email or password is wrong')
        }
    }

    useEffect(() => {
        if (user){
            navigate('/');
        }
    }, [navigate, user]);

    return (
        <div>
            <section className="bg-[#F6F6F6] py-8">
                <Container>
                    <div className="flex flex-col gap-2 p-3">
                        <h3 className="text-2xl font-bold text-[#0E1422]">Login</h3>
                        <BreadCrumb containerClassName="ml-0 w-full" links={links}/>
                    </div>
                </Container>
            </section>

            <Container>
                <form onSubmit={loginUser}
                      className="my-32 flex flex-col items-center justify-center max-w-96 w-full mx-auto">

                    <div className="flex items-center justify-between w-full mb-10">
                        <hr className="border-t border-[#E6E7E8] my-4 align-middle w-2/5 "/>
                        <p className="text-[#5C5F6A] text-lg font-bold">LOGIN</p>
                        <hr className="border-t border-[#E6E7E8] my-4 align-middle w-2/5"/>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        { error && <p className="text-red-600 text-lg">{error}</p>}
                    </div>
                    <div className="w-full flex flex-col gap-4 mb-4">
                        <Input required={true} value={loginForm.email} onChange={updateForm} name="email"
                               inputType={"email"} inputClassName={"w-full"}
                               label={"Email"}
                               placeholder={"Enter Your Email"}/>
                        <Input required={true} value={loginForm.password} onChange={updateForm} name="password"
                               inputType={"password"} inputClassName={"w-full"}
                               label={"Password"}
                               placeholder={"Enter Your Password"}/>
                    </div>

                    <Link to={"/forgotPassword"} className="w-full"><p
                        className="flex justify-end text-sm text-[#555555] font-medium mb-8">Forgot Password?</p>
                    </Link>
                    <Button title="Login" className="w-full mb-8"/>
                    <Link to={"/signup"} className="flex justify-center text-[#5C5F6A]"><span className="text-sm">Don't have an account? Sign up</span></Link>

                </form>
            </Container>

        </div>
    );
}