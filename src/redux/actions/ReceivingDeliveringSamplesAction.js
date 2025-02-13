import { GET_Inspection, GET_LAB_INCIDENT, GET_ERROR } from "../type";
// import baseURL from "../../api/baseURL";
import { useGetData } from "../../hooks/useGetData";

// get all Criminal Effects
export const getAllInspection = () => async (dispatch) => {
  try {
    const res = await useGetData(`api/inspection-form-labs/`);

    dispatch({
      type: GET_Inspection,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};

export const labsByIncident = (id) => async (dispatch) => {
  try {
    const res = await useGetData(`api/inspection-labs-by-incident/${id}`);

    dispatch({
      type: GET_LAB_INCIDENT,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};
