import {Icon} from "./Icon";
import React from "react";

const btnTypes = {
    defaultBtn: {
        typeClasses: "bg-[#0E1422] rounded border py-3 px-6 h-[2.75rem] hover:[#202533]",
        divClasses: "bg-white",
        titleClasses: ""
    },
    LightGrayBtn: {
        typeClasses: "rounded-xl py-3 px-6 h-[2.75rem] w-[15rem] bg-[#F6F6F6]",
        divClasses: "bg-gray-400",
        titleClasses: "text-[#f1ebdd] font-normal"
    },
    whiteBoldBtn: {
        typeClasses: "bg-white rounded border py-3 px-6 h-[2.75rem] border-black hover:bg-[#0E1422]",
        divClasses: "bg-gray-500",
        titleClasses: "text-white group-hover:text-black"
    },
    whiteBoldSmallBtn: {
        typeClasses: "bg-white rounded border py-3 px-5 h-[2.75rem] border-black hover:border-[#B6B7BC]",
        divClasses: "bg-gray-500",
        titleClasses: "text-white group-hover:text-[#5C5F6A]"
    },
    whiteLightRoundedBtn: {
        typeClasses: "bg-white rounded-3xl w-24 border py-1 px-4 h-8",
        divClasses: "bg-gray-500",
        titleClasses: "text-[#5C5F6A]"
    },

}

export type BtnType = keyof typeof btnTypes;

interface ButtonProps {
    icon?: string,
    className?: string,
    title: string,
    type?: BtnType,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    name?: string
}

export function Button({icon, className, title, type = "defaultBtn", onClick, name}: ButtonProps) {

    let typeClasses = btnTypes[type].typeClasses + " " + className
    let divClasses = btnTypes[type].divClasses
    let titleClasses = btnTypes[type].titleClasses

    return <button
        name={name}
        onClick={onClick}
        className={`${typeClasses} overflow-hidden group/button relative transition duration-200 flex items-center group justify-center`}>
        <span className={`${titleClasses} font-medium invert flex items-center`}>{title}</span>
        <div
            className={`${divClasses} group-hover/button:top-[-100%] left-0 absolute w-full h-full top-full transition-all duration-600`}>
        </div>
        {
            (icon) ? <Icon name={`${icon}`}/> : null
        }
    </button>;
}