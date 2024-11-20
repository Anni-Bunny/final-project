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
            child2={<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
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
            </ul>}
        />
    )
}
