import React, { useState } from "react";
import { Search, X } from "lucide-react";
import SearchHook from "../../hook/Search/search-hook";

const SearchBar = () => {
  const [oneChangeSearch, searchWord, onClickDeleteSearch] = SearchHook();
  let word= ""
  if (localStorage.getItem("searchWord") != null) 
    word = localStorage.getItem("searchWord");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="relative bg-white rounded-lg border border-gray-500 shadow-sm transition-shadow duration-200 "
      >
        <div className="relative flex items-center">
          <button
            type="submit"
            className="absolute right-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="بحث"
          >
            <Search className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={word}
            onChange={oneChangeSearch}
            placeholder="ابحث هنا..."
            className="w-full px-12 py-3 text-base text-right bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-shadow"
            dir="rtl"
          />

          {word && (
            <button
              type="button"
              onClick={onClickDeleteSearch}
              className="absolute left-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="مسح البحث"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
