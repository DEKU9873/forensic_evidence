import React, { useEffect } from "react";
import { getAllIncidents, getAllIncidentsPage } from "../../redux/actions/CriminalEffectsAction";
import { useSelector, useDispatch } from "react-redux";

const IncidentsHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllIncidents(2));
  }, []);

  const incidents = useSelector(
    (state) => state.criminalEffectsReducer.incidents
  );
  const loading = useSelector((state) => state.criminalEffectsReducer.loading);

  let pageCount = 0;
  if (incidents.paginationResult)
    pageCount = incidents.paginationResult.numberOfPages;

  // When press pagination
  const getPage = (page) => {
    dispatch(getAllIncidentsPage(page, 2));
    console.log(page);
  };

  return [incidents, loading, pageCount, getPage];
};

export default IncidentsHook;
