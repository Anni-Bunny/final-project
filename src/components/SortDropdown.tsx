import React from 'react';
import {Dropdown} from "./DropDown";  // Import Button

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
    return (
        <Dropdown
            title={`Sort By ${sortTitle}`}
            icon={"chevronDown"}
            child2={<ul className="py-2 text-sm w-44 text-[#0E1422]">
                {sortByList.map((item, index) => (
                    <React.Fragment key={index}>
                        {sortedBy !== `-${item.sortKey}` && (
                            <li
                                className="block px-4 py-2 hover:bg-gray-400 bg-opacity-25 cursor-pointer transition duration-200 hover:text-white hover:font-bold"
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
                                className="block px-4 py-2 hover:bg-gray-400 cursor-pointer transition duration-200 hover:text-white hover:font-bold"
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
            </ul>}
            mainDivClassName="justify-end"
            child2ClassName="right-2"
        />
    )
}
