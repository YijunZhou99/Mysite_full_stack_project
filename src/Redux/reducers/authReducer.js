import{
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = 
  user 
    ? { isLoggedIn: true, user}
    : { isLoggedIn: false, user: null};


export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        user: action.payload.user,
      };
    case LOGIN_FAIL:
      return {
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};