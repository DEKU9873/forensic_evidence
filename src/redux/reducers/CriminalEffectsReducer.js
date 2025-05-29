import {
  GET_Evidence,
  GET_ONE_EVIDENCE,
  GET_ERROR,
  GET_Incidents,
  GET_ONE_Incidents,
  GET_Evidencebyincident,
  GET_IncidentImage,
  GET_Complaint,
  Send_Incident,
} from "../type";

const inital = {
  evidence: [],
  oneEvidence: [],

  incidents: [],
  oneIncidents: [],
  evidencebyincident: [],
  image:[],
  complaint:[],

  loading: true,
};
const criminalEffectsReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_Evidence:
      return {
        ...state,
        evidence: action.payload,
        loading: false,
      };
    case GET_ONE_EVIDENCE:
      return {
        ...state,
        oneEvidence: action.payload,
        loading: false,
      };
    case GET_Incidents:
      return {
        ...state,
        incidents: action.payload,
        loading: false,
      };
    case GET_ONE_Incidents:
      return {
        ...state,
        oneIncidents: action.payload,
        loading: false,
      };
    case GET_Evidencebyincident:
      return {
        ...state,
        evidencebyincident: action.payload,
        loading: false,
      };
    case GET_IncidentImage:
      return {
        ...state,
        image: action.payload,
        loading: false,
      };
    case GET_Complaint:
      return {
        ...state,
        complaint: action.payload,
        loading: false,
      };
    case Send_Incident:
      return {
        ...state,
        oneIncidents: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return {
        ...state,
        loading: false,
        evidence: action.payload,
      };
    default:
      return state;
  }
};

export default criminalEffectsReducer;
