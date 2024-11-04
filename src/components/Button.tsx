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
    whiteBtn: {
        typeClasses: "bg-white rounded border py-3 px-6 h-[2.75rem] border-black ",
        divClasses: "bg-gray-400",
        titleClasses: "text-white font-normal"
    },
    whiteSmallBtn: {
        typeClasses: "bg-white py-3 px-5 h-[2.75rem] ",
        divClasses: "",
        titleClasses: "text-[#5C5F6A] group-hover:text-[#f1ebdd] "
    },
    whiteLightRoundedBtn: {
        typeClasses: "bg-white rounded-3xl w-24 border py-1 px-4 h-8",
        divClasses: "bg-gray-500",
        titleClasses: "text-[#5C5F6A]"
    },

}

const iconPositions = {
    start: "-order-1",
    end: "",
}
const textPositions = {
    start: "justify-start",
    center: "justify-center items-center"
}

export type TextPosition = keyof typeof textPositions;
export type IconPosition = keyof typeof iconPositions;
export type BtnType = keyof typeof btnTypes;

interface ButtonProps {
    icon?: string,
    className?: string,
    title: string,
    type?: BtnType,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    name?: string,
    iconPosition?: IconPosition,
    textPosition?: TextPosition
}

export function Button({icon, className, title, type = "defaultBtn", onClick, name, iconPosition = 'end', textPosition = "center"}: ButtonProps) {

    let typeClasses = btnTypes[type].typeClasses + " " + className + " " + textPositions[textPosition]
    let divClasses = btnTypes[type].divClasses
    let titleClasses = btnTypes[type].titleClasses

    return <button
        name={name}
        onClick={onClick}
        className={`${typeClasses} gap-2 items-center overflow-hidden group/button relative transition duration-200 flex group`}>
        <span className={`${titleClasses} font-medium invert flex`}>{title}</span>
        <div
            className={`${divClasses} group-hover/button:top-[-100%] left-0 absolute w-full h-full top-full transition-all duration-600`}>
        </div>
        {
            (icon) ? <Icon className={iconPositions[iconPosition]} name={`${icon}`}/> : null
        }
    </button>;
}