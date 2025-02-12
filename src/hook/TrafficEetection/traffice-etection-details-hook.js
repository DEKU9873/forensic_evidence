import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllFireForm,
  getOneFireForm,
} from "../../redux/actions/TrafficEetectionAction";

const TrafficeEtectionHook = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneFireForm(id));
  }, []);

  const fire = useSelector((state) => state.TrafficEetectionReducer.onefire);

  let data = [];
  if (fire && fire.data) {
    data = fire.data;
  } else {
    data = [];
  }

  return [data];
};

export default TrafficeEtectionHook;
