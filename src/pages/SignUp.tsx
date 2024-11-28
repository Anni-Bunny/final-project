import {BreadCrumb} from "../components/BreadCrumb";
import React, {useState} from "react";
import {Container} from "../components/Container";
import {Button} from "../components/Button";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "../components/Input";
import api from "../classes/API";


export interface signupInfo {
    firstname: string,
    lastname: string,
    email: string,
    password:string,
}

export function SignUp() {
    const [signupInfo, setSignupInfo] = useState<signupInfo>({firstname:'', lastname:'', email:'', password:''})
    const navigate = useNavigate();

    function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.currentTarget.value
        const name = event.currentTarget.name

            setSignupInfo((state) => ({
                ...state,
                [name]: val
            }))
    }

    async function signupUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const userResponse = await api.registerUser({signupInfo: signupInfo});
        const userId = userResponse.id

        if (userId){
            const cartResponse = await api.createUserCart(userId)
            const wishlistResponse = await api.createUserWishList(userId)

            if (cartResponse.id && wishlistResponse.id) {
                navigate('/login');
            }

        }
    }


    let links = [
        {
            name: "Ecommerce",
            url: "/"
        },
        {
            name: "Sign up",
            url: ""
        }
    ]

    return (
        <div>
            <section className="bg-[#F6F6F6] py-8">
                <Container>
                    <div className="flex flex-col gap-2 p-3">
                        <h3 className="text-2xl font-bold text-[#0E1422]">Sign up</h3>
                        <BreadCrumb containerClassName="ml-0 w-full" links={links}/>
                    </div>
                </Container>
            </section>

            <Container>
                <form onSubmit={signupUser} className="pt-16 pb-32 flex flex-col items-center justify-center max-w-96 w-full mx-auto">
                    <div className="flex items-center justify-between w-full mb-8">
                        <hr className="border-t border-[#E6E7E8] my-4 align-middle w-2/5 "/>
                        <p className="text-[#5C5F6A] text-lg font-bold">SIGNUP</p>
                        <hr className="border-t border-[#E6E7E8] my-4 align-middle w-2/5"/>
                    </div>
                    <div className="w-full flex flex-col gap-4 mb-4">
                        <Input required={true} onChange={onChangeInput} name="firstname" inputType={"text"} inputClassName={"w-full"} label={"First name"} placeholder={"Enter Your First name"}/>
                        <Input required={true} onChange={onChangeInput} name="lastname" inputType={"text"} inputClassName={"w-full"} label={"Last name"} placeholder={"Enter Your Last name"}/>
                        <Input required={true} onChange={onChangeInput} name="email" inputType={"email"} inputClassName={"w-full"} label={"Email"} placeholder={"Enter Your Email"}/>
                        <Input required={true} onChange={onChangeInput} name="password" inputType={"password"} inputClassName={"w-full"} label={"Password"} placeholder={"Enter Your Password"}/>
                    </div>

                    <Link to={""} className="w-full"><p className="flex justify-end text-sm text-[#5C5F6A] font-medium mb-8">By creating an account you agree with our Terms of Service and Privacy</p></Link>
                    <Button title="Create account" className="w-full mb-8"/>
                    <Link to={"/login"} className="flex justify-center text-[#5C5F6A]"><span className="text-sm">Already have an account? Log in</span></Link>

                </form>
            </Container>

        </div>
    );
}