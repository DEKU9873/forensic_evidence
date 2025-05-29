import { CREATE_NEW_USER, LOGIN_USER, GET_ALL_USERS, GET_ERROR, Toggle_Activity } from "../type";
import { useInsertData  } from "../../hooks/useInsertData";
import {useGetData } from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData";
import { useUpdateData } from "../../hooks/useUpdateData";

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

export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await useGetData(`/account/users/`);
    dispatch({
      type: GET_ALL_USERS,
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

export const deleteUser = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/account/users/${id}/`);
    dispatch({
      type: GET_ALL_USERS, 
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


export const toggleActivity = (id) => async (dispatch) => {
  try {
    const res = await useUpdateData(`account/toggle-activity/${id}`);

    dispatch({
      type: Toggle_Activity,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};


