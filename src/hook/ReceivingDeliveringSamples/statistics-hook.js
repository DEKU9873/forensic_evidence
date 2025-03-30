import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllStatistics } from "../../redux/actions/StatisticsAction";

const StatisticsHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStatistics());
  }, [dispatch]);

  const statistics = useSelector((state) => state.StatisticsReducer.statistics);
  const loading = useSelector((state) => state.StatisticsReducer.loading);

  console.log(statistics);

  let statistic = [];
  if (statistics) {
    statistic = statistics;
  } else {
    statistic = [];
  }


  return [statistic, loading];
};

export default StatisticsHook;
