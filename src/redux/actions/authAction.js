import { CREATE_NEW_USER, LOGIN_USER } from "../type";
import { useInsertData } from "../../hooks/useInsertData";

//create new user
export const createNewUser = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`account/register/`, data);
    dispatch({
      type: CREATE_NEW_USER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: CREATE_NEW_USER,
      payload: e.response,
    });
  }
};

//login  user
export const loginUser = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/account/login/`, data);
    dispatch({
      type: LOGIN_USER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: LOGIN_USER,
      payload: e.response,
    });
  }
};

