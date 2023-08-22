import React, { useState } from 'react';

interface SearchProps {
    onSearch: (term: string) => void;
}

const SearchComponent: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
    };

    return (
        <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
        />
    );
};

export default SearchComponent;
