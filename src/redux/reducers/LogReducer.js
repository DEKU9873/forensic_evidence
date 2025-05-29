import { GET_LOG, GET_ERROR } from "../type";

const inital = {
  log: [],
  loading: true,
};
const LogReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_LOG:
      return {
        ...state,
        log: action.payload,
        loading: false,
      };
   
    case GET_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default LogReducer;
