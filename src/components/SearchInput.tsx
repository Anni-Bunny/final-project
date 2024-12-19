import React, {useState} from 'react';
import {Icon} from "./Icon";

interface searchInputProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    debounceTime?: number; // Optional debounce time in ms (default: 500ms)
}

export function SearchInput({
                                placeholder = 'Search...',
                                onSearch,
                                debounceTime = 500,
                            }: searchInputProps) {

    const [query, setQuery] = useState<string>('');
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        // Debounce search input
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            onSearch(newQuery);
        }, debounceTime);

        setTimer(newTimer);
    };


    return (
        <div className="relative flex border border-1 rounded-md gap-2 px-4 py-2.5 h-11 items-center w-72">
            <Icon name="search"/>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="h-6 outline-none"
            />

        </div>
    );
}