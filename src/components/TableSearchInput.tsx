import React, {useState} from 'react';
import {Button} from "./Button";
import {useNavigate} from "react-router-dom";

interface searchInputProps {
    placeholder?: string;
}

export function TableSearchInput({placeholder = "Search..."}: searchInputProps) {
    const [query, setQuery] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value);
    };

    const handleSearch = () => {

    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
            setQuery('')
        }
    };


    return (
        <div className="relative flex border border-1 rounded-md gap-2 px-4 py-2.5 h-11 items-center w-72">
            <Button icon="search" type="CleanBtn" onClick={handleSearch}/>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="h-6 outline-none"
                onKeyDown={handleKeyPress}
            />

        </div>
    );
}