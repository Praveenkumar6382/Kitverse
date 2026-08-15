import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (onSearch) {
      onSearch(value);
    }
  };


  return (
    <div className="flex items-center bg-white border rounded-full px-4 py-2 w-64">

      <input
        type="text"
        placeholder="Search jerseys..."
        value={search}
        onChange={handleSearch}
        className="flex-1 outline-none px-2 text-black"
      />

      <FaSearch className="text-gray-500" />

    </div>
  );
};

export default SearchBar;