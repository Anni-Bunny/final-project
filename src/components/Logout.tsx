import {Button} from "./Button";
import React from "react";
import {useDispatch} from "react-redux";
import {clearUser} from "../store/slices/userSlice";
import {clearCart} from "../store/slices/cartSlice";
import {useNavigate} from "react-router-dom";
import {clearWishList} from "../store/slices/wishListSlice";

export function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function clearUserData() {
        dispatch(clearUser())
        dispatch(clearCart())
        dispatch(clearWishList())
        navigate('/')
    }

    return (
        <>
            <Button onClick={clearUserData} title={"Log out"} type={"whiteSmallBtn"} className="flex text-start"/>
        </>
    );
}