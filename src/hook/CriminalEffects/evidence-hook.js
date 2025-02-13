import React, { useEffect } from "react";
import { getAllEvidence } from "../../redux/actions/CriminalEffectsAction";
import { useSelector, useDispatch } from "react-redux";

const EvidenceHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvidence());
  }, []);

  const evidence = useSelector(
    (state) => state.criminalEffectsReducer.evidence
  );
  const loading = useSelector((state) => state.criminalEffectsReducer.loading);

  return [evidence, loading];
};

export default EvidenceHook;
