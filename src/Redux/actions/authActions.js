import { 
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  } from "./types";

import authService from "../../Services/auth.service";
import postService from "../../Services/post.service";
import followService from "../../Services/follow.service";

const register = (data) => (dispatch) => {
  return authService.register(data).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {user: response.data}
      });
      return Promise.resolve();
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  )
}

const login = (username, password) => (dispatch) => {
  return authService.login(username, password).then(
    (data) => {
      const user = data.length ? data[0] : null;

      if (user){
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {user: data}
        })
        return Promise.resolve();
      } else {
        dispatch({
          type: LOGIN_FAIL,
          })
        dispatch({
          type: SET_MESSAGE,
          payload: "Wrong username or password"
        })
        };
        return Promise.reject();
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      dispatch({
        type: LOGIN_FAIL,
      })
      dispatch({
        type: SET_MESSAGE,
        payload: "Wrong username or password"
        });
      return Promise.reject();
    }
  )
};


const logout = () => {
  authService.logout();
  postService.clearPosts();
  followService.clearFollowings();
  return {
    type: LOGOUT,
  };
}

export const authActions = {
  register,
  login,
  logout,
};
