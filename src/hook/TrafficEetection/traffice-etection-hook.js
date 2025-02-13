import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllFireForm, getAllFireFormPage } from "../../redux/actions/TrafficEetectionAction";

const TrafficeEtectionHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFireForm(2));
  }, []);

  const fire = useSelector((state) => state.TrafficEetectionReducer.fire);
  const loading = useSelector((state) => state.TrafficEetectionReducer.loading);


  
    let pageCount = 0;
    if (fire.paginationResult)
      pageCount = fire.paginationResult.numberOfPages;
  
    // When press pagination
    const getPage = (page) => {
      dispatch(getAllFireFormPage(page, 2));
      console.log(page);
    };
  
    return [fire, loading, pageCount, getPage];

};

export default TrafficeEtectionHook;
