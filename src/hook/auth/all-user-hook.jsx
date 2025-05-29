import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/authAction';

const AllUserHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAllUsers());
    }, []);
    const users = useSelector((state) => state.authReducer.user);

    let user = [];
    if (users && users.data) {
        user = users.data;
    } else {
        user = [];
    }
  
    return [user];
}

export default AllUserHook


