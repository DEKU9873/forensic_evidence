import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllFireForm } from "../../redux/actions/TrafficEetectionAction";

const TrafficeEtectionHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFireForm());
  }, []);

  const fire = useSelector((state) => state.TrafficEetectionReducer.fire);
  const loading = useSelector((state) => state.TrafficEetectionReducer.loading);

  return [fire, loading];
};

export default TrafficeEtectionHook;
