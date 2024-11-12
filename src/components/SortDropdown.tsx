import React, {useState} from 'react';
import {Button} from './Button';  // Import Button

interface SortDropdownProps {
    sortedBy: string;
    sortTitle: string;
    sortByList: { title: string; sortKey: string }[];
    onSortChange: (sortBy: string, title: string) => void;
}

export function SortDropdown({
                                 sortedBy,
                                 sortTitle,
                                 sortByList,
                                 onSortChange,
                             }: SortDropdownProps) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleDropdown = () => {
        setIsVisible((prev) => !prev);
    };

    return (
        <div className="flex relative w-full justify-end"
             onMouseLeave={() => setIsVisible(false)}>
            <Button
                title={`Sort By ${sortTitle}`}
                icon={"chevronDown"}
                className={""}
                type={"whiteSmallBtn"}
                onClick={toggleDropdown}
            />
            <div
                className={`absolute bottom-0 translate-y-full z-10 ${isVisible ? '' : 'hidden'} bg-gray-500 rounded shadow-2xl w-44`}
            >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {sortByList.map((item, index) => (
                        <React.Fragment key={index}>
                            {sortedBy !== `-${item.sortKey}` && (
                                <li
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                    data-sort-by={`-${item.sortKey}`}
                                    onClick={() => {
                                        onSortChange(`-${item.sortKey}`, `${item.title} desc`);
                                    }}
                                >
                                    {item.title} desc
                                </li>
                            )}

                            {sortedBy !== `${item.sortKey}` && (
                                <li
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                    data-sort-by={item.sortKey}
                                    onClick={() => {
                                        onSortChange(`${item.sortKey}`, `${item.title} asc`);
                                    }}
                                >
                                    {item.title} asc
                                </li>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
}
