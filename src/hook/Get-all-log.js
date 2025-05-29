import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLog } from "../redux/actions/logAction";

const GetAllLog = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLog());
  }, []);

  const logs = useSelector((state) => state.LogReducer.log);

  return [logs];
};

export default GetAllLog;