import {useState} from "react";
import {Button} from "./Button";

interface dropDownProps{
    children: any,
    className?: string | null,

}

export function DropDown({children, className = null}: dropDownProps) {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    return (
        <div className={`${className}`}>
            <Button/>
            {children}
        </div>
    );
}