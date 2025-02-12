import React, { useEffect } from 'react'
import { getAllIncidents } from '../../redux/actions/CriminalEffectsAction';
import { useSelector, useDispatch } from "react-redux";


const IncidentsHook = () => {

    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllIncidents());
  }, []);

  const incidents = useSelector((state) => state.criminalEffectsReducer.incidents);
  const loading = useSelector((state) => state.criminalEffectsReducer.loading);


  return [incidents,loading]


}

export default IncidentsHook