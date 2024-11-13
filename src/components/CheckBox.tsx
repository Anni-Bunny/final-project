import React from "react";

interface checkboxProps{
    label?: string,
    name?:string,
    value?:string | number,
    checked?: boolean,
    onChange?:  React.ChangeEventHandler<HTMLInputElement>;
}
export function CheckBox({label, name, value, checked, onChange}:checkboxProps) {
    return (

        <div className="cursor-pointer ">
            <label className="flex gap-2.5 text-sm">
                <input type="checkbox" value={value} checked={checked} name={name} onChange={onChange}
                       className="w-[1.125rem] h-[1.125rem] border-[#E6E7E8] rounded"/>
                <span className="text-[#474B57]">{label}</span>
            </label>
        </div>

    );
}