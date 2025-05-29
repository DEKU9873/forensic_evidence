import { CREATE_NEW_USER, LOGIN_USER, GET_ALL_USERS, Toggle_Activity } from "../type";

const inital = {
  user: [],
  createUser: [],
  loginUser: [],
  loading: true,
};
const authReducer = (state = inital, action) => {
  switch (action.type) {
    case CREATE_NEW_USER:
      return {
        ...state,
        createUser: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loginUser: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        user: action.payload,
      };
    case Toggle_Activity:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
