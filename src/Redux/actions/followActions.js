import {
  GET_ALL_USERS,
  GET_FOLLOWING_USERS,
  ADD_FOLLOWING_USER,
  DELETE_FOLLOWING_USER,
  SET_MESSAGE,
} from "./types";

import followService from "../../Services/follow.service";

const getAllUsers = () => (dispatch) => {
  return followService.getAllUsers().then(
    (data) => {
      dispatch({
        type: GET_ALL_USERS,
        payload: data
      })
      return Promise.resolve();
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return Promise.reject();
    }
  )
};

const getFollowings = (user) => (dispatch) => {
  return followService.getFollowings(user).then(
    (data) => {
      dispatch({
        type: GET_FOLLOWING_USERS,
        payload: data
      })
      return Promise.resolve();
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return Promise.reject();
    }
  )
};

const addFollowing = (username) => (dispatch) => {
  return followService.addFollowing(username).then(
    (data) => {
      dispatch({
        type: ADD_FOLLOWING_USER,
        payload: data
      })
      dispatch({
        type: SET_MESSAGE,
        payload: "You are now following " + username
      })
      return Promise.resolve();
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message
        })
        return Promise.reject();
      } 
  )
}

const deleteFollowing = (userID) => (dispatch) => {
  console.log("in action",userID);
  const newFollowings = followService.deleteFollowing(userID);
  console.log("newFollowings",newFollowings);
      dispatch({
        type: DELETE_FOLLOWING_USER,
        payload: newFollowings
      })
      dispatch({
        type: SET_MESSAGE,
        payload: "You have unfollowed this user"
      })
      return Promise.resolve();
  };

export default {
  getAllUsers,
  getFollowings,
  addFollowing,
  deleteFollowing,
};


