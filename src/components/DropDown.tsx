import React, {useState} from 'react';
import {BtnType, Button} from './Button';

interface dropdownProps {
    title?: string;
    icon?: string,
    child1?: React.ReactNode,
    child2?: React.ReactNode,
    child1ClassName?: string,
    child2ClassName?: string,
    mainDivClassName?: string
    btnType?: BtnType
}

export function Dropdown({
                             title,
                             icon,
                             child1,
                             child2,
                             child1ClassName,
                             child2ClassName,
                             mainDivClassName,
                             btnType="whiteSmallBtn",
                         }: dropdownProps) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleDropdown = () => {
        setIsVisible((prev) => !prev);
    };

    return (
        <div className={`flex relative w-full ${mainDivClassName}`}
             onMouseLeave={() => setIsVisible(false)}>
            <div className="relative">
                <Button
                    title={title}
                    icon={icon}
                    className={"relative"}
                    type={btnType}
                    onClick={toggleDropdown}
                />
                <span className={`absolute ${child1ClassName}`}>
                    {child1}
                </span>
            </div>

            <div
                className={`absolute right-2 bottom-0 translate-y-full z-10 ${isVisible ? '' : 'hidden'} bg-white rounded shadow-2xl transition duration-400 ${child2ClassName}`}>
                {child2}
            </div>
        </div>
    );
}
