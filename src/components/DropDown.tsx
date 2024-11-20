import React, {useState} from 'react';
import {Button} from './Button';

interface dropdownProps {
    title?: string;
    icon?: string,
    child1?: React.ReactNode,
    child2?: React.ReactNode,
    child1ClassName?: string,
    child2ClassName?: string,
}

export function Dropdown({
                             title,
                             icon,
                             child1,
                             child2,
                             child1ClassName,
                             child2ClassName,
                         }: dropdownProps) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleDropdown = () => {
        setIsVisible((prev) => !prev);
    };

    return (
        <div className="flex relative w-full justify-end"
             onMouseLeave={() => setIsVisible(false)}>
            <div className="relative">
                <Button
                    title={title}
                    icon={icon}
                    className={"relative"}
                    type={"whiteSmallBtn"}
                    onClick={toggleDropdown}
                />
                <span className={`absolute ${child1ClassName}`}>
                    {child1}
                </span>
            </div>

            <div
                className={`absolute right-2 bottom-0 translate-y-full z-10 ${isVisible ? '' : 'hidden'} bg-white rounded shadow-2xl w-44 transition duration-400 ${child2ClassName}`}>
                {child2}
            </div>
        </div>
    );
}
