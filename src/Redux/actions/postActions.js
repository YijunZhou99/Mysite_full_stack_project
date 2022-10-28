import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  ADD_POST,
  SEARCH_POST,
} from "./types";

import postService from "../../Services/post.service";
const getAllPosts = () => (dispatch) => {
  return postService.getAllPosts().then(
    (data) => {
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: { posts: data },
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: GET_POSTS_FAIL,
      });
      return Promise.reject();
    }
  );
};

const getPosts = (userId) => (dispatch) => {
  return postService.getPostsbyUser(userId).then(
    (data) => {
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: { posts: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: GET_POSTS_FAIL,
        payload: { message },
      });
      return Promise.reject();
    }
  );
}

const addPost = (post) => (dispatch) => {
  postService.setNewPost(post);
  dispatch({
    type: ADD_POST,
    payload: { post: post },
  });
  return Promise.resolve();
}

const searchPost = (searchby, query) => (dispatch) => {
  dispatch({
    type: SEARCH_POST,
    payload: { 
      searchby: searchby,
      query: query 
    },
  });
  return Promise.resolve();
}

export default {
  getAllPosts,
  getPosts,
  addPost,
  searchPost,
};