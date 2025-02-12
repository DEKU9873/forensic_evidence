import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneEvidence } from "../../redux/actions/CriminalEffectsAction";


const EvidenceDetailsHook = (id) => {


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOneEvidence(id));
      }, [dispatch, id]);


     const oneEvidence = useSelector((state) => state.criminalEffectsReducer.oneEvidence);

     let data = [];
  if (oneEvidence && oneEvidence.data) {
    data = oneEvidence.data;
  } else {
    data = [];
  }

    return [data]

}

export default EvidenceDetailsHook
