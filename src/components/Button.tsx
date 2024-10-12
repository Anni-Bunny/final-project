import {Icon} from "./Icon";

interface ButtonProps {
    icon?: string,
    className?: string,
    title: string,
    type?: 'button-1' | 'button-2' | 'button-3' | 'button-4' | 'button-5' | 'button-6' | 'button-7' | 'button-8'
}

export function Button({icon, className, title, type = "button-1"}: ButtonProps) {

    let typeClasses = ""
    let divClasses = ""
    let titleClasses = ""

    switch (type) {
        case 'button-1': {
            typeClasses = "bg-[#0E1422] rounded border py-3 px-6 h-[2.75rem]"
            divClasses = "bg-white"
            titleClasses = ""
            break;
        }
        case 'button-2': {
            typeClasses = "bg-[#202533] rounded border py-3 px-6 h-[2.75rem]"
            divClasses = "bg-white"
            titleClasses = ""
            break;
        }
        case 'button-3': {
            typeClasses = "bg-white rounded border py-3 px-6 h-[2.75rem]"
            divClasses = "bg-gray-500"
            titleClasses = "text-[#5C5F6A]"
            break;
        }
        case 'button-4': {
            typeClasses = "bg-white py-3 px-6 h-[2.75rem]"
            divClasses = "bg-gray-500"
            titleClasses = "text-[#0E1422]"
            break;
        }
        case 'button-5': {
            typeClasses = "bg-white rounded border py-3 px-6 h-[2.75rem] border-black"
            divClasses = "bg-gray-500"
            titleClasses = "text-[#0E1422]"
            break;
        }
        case 'button-6': {
            typeClasses = "bg-[#0E1422] rounded border py-3 px-5 h-[2.75rem]"
            divClasses = "bg-white"
            titleClasses = ""
            break;
        }
        case 'button-7': {
            typeClasses = "bg-white rounded border py-3 px-5 h-[2.75rem] border-black"
            divClasses = "bg-gray-500"
            titleClasses = "text-[#0E1422]"
            break;
        }
        case 'button-8': {
            typeClasses = "bg-white rounded border py-3 px-5 h-[2.75rem]"
            divClasses = "bg-gray-500"
            titleClasses = "text-[#5C5F6A]"
            break;
        }
    }

    return <button
        className={`${typeClasses} overflow-hidden group/button relative transition duration-200 flex items-center ${className}`}>
        <span className={`${titleClasses} font-medium invert flex items-center`}>{title}</span>
        <div
            className={`${divClasses} group-hover/button:top-[-100%] left-0 absolute w-full h-full top-full transition-all duration-600`}>
        </div>
        {
            (icon)? <Icon name={`${icon}`}/> : null
        }
    </button>;
}