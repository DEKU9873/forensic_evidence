import {GET_Fire_Form, GET_ONE_Fire_Form, GET_ERROR } from "../type";
// import baseURL from "../../api/baseURL";
import {useGetData} from "../../hooks/useGetData";


// get all Criminal Effects
export const getAllFireForm = ()=> async (dispatch) => {
  try {
    const res = await useGetData(`api/fireplace/`);

    dispatch({
      type: GET_Fire_Form,
      payload: res,
    })
  } catch (e) {
    dispatch({
        type: GET_ERROR,    
        payload:"Error" + e,
      })
  }
};

export const getOneFireForm = (id)=> async (dispatch) => {
  try {
    const res = await useGetData(`api/fireplace/${id}`);

    dispatch({
      type: GET_ONE_Fire_Form,
      payload: res,
    })
  } catch (e) {
    dispatch({
        type: GET_ERROR,    
        payload:"Error" + e,
      })
  }
};
