import React from "react";

interface InputProps {
    name?: string,
    value?:string,
    className?: string,
    label?: string,
    inputType: string,
    placeholder?: string,
    inputClassName?:string,
    onChange?:  React.ChangeEventHandler<HTMLInputElement>;
    required?: boolean
}

export function Input({name, value, label, className, inputType, placeholder, inputClassName, onChange, required}: InputProps) {
    return (
        <div className={`flex flex-col ${className}`}>
            {
                (label) ? <label className="text-sm/6 font-medium text-[#474B57]">{label}</label> : null
            }
            <input required={required} onChange={onChange} value={value} name={name} className={`${inputClassName} rounded-md border border-[#E6E7E8] py-2.5 px-[0.938rem] h-[2.813rem] w-80 text-black text-sm
            focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 required:`}
                   type={inputType}
                   placeholder={placeholder}/>
        </div>
    )
}
