import { GET_LOG,  GET_ERROR } from "../type";
import {useGetData } from "../../hooks/useGetData";

//create new user
export const getLog = (data) => async (dispatch) => {
  try {
    const response = await useGetData(`api/frontend-logs/`, data);
    dispatch({
      type: GET_LOG,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response,
    });
  }
};

