import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendIncident } from '../../redux/actions/CriminalEffectsAction';

const SendHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sendIncident());
  }, []);
  

  const send = useSelector(
    (state) => state.criminalEffectsReducer.oneIncidents
  );
 

  return [send];
}

export default SendHook