import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getIncidentImage } from '../../redux/actions/CriminalEffectsAction';

const ImagesHook = (id, selectedIncident) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getIncidentImage(id));
    }, [dispatch, id, selectedIncident]);
  
    const images = useSelector(
      (state) => state.criminalEffectsReducer.image
    );
  
    let image = [];
    if (images && images.data) {
        image = images.data;
    } else {
        image = [];
    }
  
    return [image];
}

export default ImagesHook