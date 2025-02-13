import {
  GET_Evidence,
  GET_ONE_EVIDENCE,
  GET_Incidents,
  GET_ONE_Incidents,
  GET_Evidencebyincident,
  GET_ERROR,
} from "../type";
// import baseURL from "../../api/baseURL";
import { useGetData } from "../../hooks/useGetData";

// get all Criminal Effects
export const getAllEvidence = () => async (dispatch) => {
  try {
    // const res = await baseURL.get("/categories/");
    const res = await useGetData(`api/evidence/`);

    dispatch({
      type: GET_Evidence,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};

export const getOneEvidence = (id) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/categories/");
    const res = await useGetData(`api/evidence/${id}`);

    dispatch({
      type: GET_ONE_EVIDENCE,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};
export const getAllIncidents = (limit) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/categories/");
    const res = await useGetData(`api/incidents/?limit=${limit}`);

    dispatch({
      type: GET_Incidents,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};

export const getAllIncidentsPage = (page, limit) => async (dispatch) => {
  try {
    const res = await useGetData(`api/incidents/?limit=${limit}&page=${page}`);
    dispatch({
      type: GET_Incidents,
      payload: res,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};

export const getOneIncidents = (id) => async (dispatch) => {
  try {
    const res = await useGetData(`api/incidents/${id}`);

    dispatch({
      type: GET_ONE_Incidents,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};
export const getEvidencebyIncident = (id) => async (dispatch) => {
  try {
    const res = await useGetData(`api/evidencebyincident/${id}`);

    dispatch({
      type: GET_Evidencebyincident,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};
