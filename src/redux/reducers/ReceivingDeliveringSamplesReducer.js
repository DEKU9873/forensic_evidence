import { GET_Inspection, GET_LAB_INCIDENT, GET_ERROR } from "../type";

const inital = {
  inspection: [],
  labbyincident: [],

  loading: true,
};
const receivingDeliveringSamplesReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_Inspection:
      return {
        ...state,
        inspection: action.payload,
        loading: false,
      };
    case GET_LAB_INCIDENT:
      return {
        ...state,
        labbyincident: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return {
        ...state,
        loading: false,
        inspection: action.payload,
      };
    default:
      return state;
  }
};

export default receivingDeliveringSamplesReducer;
