import { GET_Statistics, GET_ERROR } from "../type";

const inital = {
  statistics: [],
  loading: true,
};
const StatisticsReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_Statistics:
      return {
        ...state,
        statistics: action.payload,
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

export default StatisticsReducer;
