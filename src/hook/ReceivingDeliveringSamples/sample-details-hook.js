import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneEvidence } from "../../redux/actions/CriminalEffectsAction";
import { labsByIncident } from "../../redux/actions/ReceivingDeliveringSamplesAction";

const SampleDetailsHook = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(labsByIncident(id));
  }, [dispatch, id]);

  const sample = useSelector(
    (state) => state.receivingDeliveringSamplesReducer.labbyincident
  );

  let lab = [];
  if (sample && sample.data) {
    lab = sample.data;
  } else {
    lab = [];
  }


  return [lab];
};

export default SampleDetailsHook;
