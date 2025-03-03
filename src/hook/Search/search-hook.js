import React, { useEffect, useState } from "react";
import IncidentsHook from "../CriminalEffects/Incidents-hook";

const SearchHook = () => {
  const [incidents, loading, pageCount, onPress, getIncidents] = IncidentsHook();

  const [searchWord, setSearchWord] = useState("");
  const oneChangeSearch = (e) => {
    localStorage.setItem("searchWord", e.target.value);
    setSearchWord(e.target.value);
    
  };

  const onClickDeleteSearch = () => {
    localStorage.removeItem("searchWord");
    setSearchWord("");
  };

  useEffect(() => {
    setTimeout(() => {
        getIncidents();
    }, 1000);
    
  }, [searchWord]);

  return [oneChangeSearch, searchWord, onClickDeleteSearch];
};

export default SearchHook;
