import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvidencebyIncident,
  getOneIncidents,
} from "../../redux/actions/CriminalEffectsAction";

const IncidentseDetailsHook = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneIncidents(id));
    dispatch(getEvidencebyIncident(id));
  }, [dispatch, id]);

  const getOneIncidentsData = useSelector(
    (state) => state.criminalEffectsReducer.oneIncidents
  );
  const getEvidencebyIncidentData = useSelector(
    (state) => state.criminalEffectsReducer.evidencebyincident
  );

  let data = [];
  let table = [];
  if (getOneIncidentsData && getOneIncidentsData.data) {
    data = getOneIncidentsData.data;
  } else {
    data = [];
  }
  if (getEvidencebyIncidentData && getEvidencebyIncidentData.data) {
    table = getEvidencebyIncidentData.data;
  } else {
    table = [];
  }


  return [data, table];
};

export default IncidentseDetailsHook;
