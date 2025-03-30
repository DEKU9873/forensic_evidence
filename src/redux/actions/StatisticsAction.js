import { GET_Statistics,GET_ERROR } from "../type";
// import baseURL from "../../api/baseURL";
import { useGetData } from "../../hooks/useGetData";

// get all Criminal Effects
export const getAllStatistics = () => async (dispatch) => {
  try {
    const res = await useGetData(`api/incident-statistics/`);

    dispatch({
      type: GET_Statistics,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};

