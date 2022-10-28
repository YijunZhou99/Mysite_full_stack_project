import{
  GET_ALL_USERS,
  GET_FOLLOWING_USERS,
  ADD_FOLLOWING_USER,
  DELETE_FOLLOWING_USER,
} from "../actions/types";

const followings = JSON.parse(localStorage.getItem('followings'));
const allUsers = JSON.parse(localStorage.getItem('allUsers'));
const initialState = {
  allUsers: allUsers,
  followings: followings,
};

export const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_FOLLOWING_USERS:
      return {
        ...state,
        followings: action.payload,
      };
    case ADD_FOLLOWING_USER:
      return {
        ...state,
        followings: [action.payload, ...state.followings],
      };
    case DELETE_FOLLOWING_USER:
      return {
        ...state,
        followings: action.payload,
      };
    default:
      return state;
  }
}