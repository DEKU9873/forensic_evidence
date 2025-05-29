import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComplaint } from "../../redux/actions/CriminalEffectsAction";

const GetComplaint = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComplaint(id));
  }, []);

  const complaints = useSelector(
    (state) => state.criminalEffectsReducer.complaint
  );

  let complaint = [];
  if (complaints && complaints.data) {
    complaint = complaints.data;
  } else {
    complaint = [];
  }

  return [complaint];
};

export default GetComplaint;
