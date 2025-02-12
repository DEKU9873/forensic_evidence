import { GET_Fire_Form, GET_ONE_Fire_Form, GET_ERROR } from "../type";

const inital = {
  fire: [],
  onefire: [],

  loading: true,
};
const TrafficEetectionReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_Fire_Form:
      return {
        ...state,
        fire: action.payload,
        loading: false,
      };
    case GET_ONE_Fire_Form:
      return {
        ...state,
        onefire: action.payload,
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

export default TrafficEetectionReducer;
