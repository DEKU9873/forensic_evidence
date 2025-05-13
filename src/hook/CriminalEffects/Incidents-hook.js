import React, { useEffect } from "react";
import { getAllIncidents, getAllIncidentsPage, getAllIncidentsSearch } from "../../redux/actions/CriminalEffectsAction";
import { useSelector, useDispatch } from "react-redux";

const IncidentsHook = () => {
  let limit = 9
  const dispatch = useDispatch();

  const getIncidents = async () => {
    let word= ""
    if (localStorage.getItem("searchWord") != null) 
      word = localStorage.getItem("searchWord"); 
    await dispatch(getAllIncidentsSearch(`limit=${limit}&investigating_body=${word}`));
  };
  useEffect(() => {
    getIncidents()
  }, []);
 


  const incidents = useSelector(
    (state) => state.criminalEffectsReducer.incidents
  );
  const loading = useSelector((state) => state.criminalEffectsReducer.loading);

  let pageCount = 0;
  if (incidents?.paginationResult)
    pageCount = incidents?.paginationResult.numberOfPages;


  const onPress = async (page) => {
    
    let word= ""
    if (localStorage.getItem("searchWord") != null) 
      word = localStorage.getItem("searchWord");
    await dispatch(getAllIncidentsSearch(`limit=${limit}&page=${page}&investigating_body=${word}`));
  };

  return [incidents, loading, pageCount, onPress, getIncidents];
};

export default IncidentsHook;
