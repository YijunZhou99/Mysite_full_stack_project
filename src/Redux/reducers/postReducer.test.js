import React from "react";
import Users from "../../Data/Users";
import Posts from "../../Data/Users";
import { postReducer } from "./postReducer";

describe("postReducer", () => {
  it("should return the initial state", () => {
    expect(postReducer(undefined, {})).toEqual({
      posts: null,
      searchby: "",
      searchquery: "",
    });
  });

  it("should get all posts", () => {
    const initialState = {
      posts: [],
      searchby: "",
      searchquery: "",
    };
    const action = {
      type: "GET_POSTS_SUCCESS",
      payload: {posts:Posts},
    };
    const expectedState = {
      posts: Posts,
      searchby: "",
      searchquery: "",
    };
    expect(postReducer(initialState, action)).toEqual(expectedState);
  });

  it("should get posts by search", () => {
    const initialState = {
      posts: [],
      searchby: "",
      searchquery: "",
    };
    const action = {
      type: "SEARCH_POST",
      payload: {
        searchby: "title",
        query: "test",
      },
    };
    const expectedState = {
      posts: [],
      searchby: "title",
      searchquery: "test",
    };
    expect(postReducer(initialState, action)).toEqual(expectedState);
  });

  it("should add a post", () => {
    const initialState = {
      posts: [],
      searchby: "",
      searchquery: "",
    };
    const action = {
      type: "ADD_POST_SUCCESS",
      payload: {
        post: Posts[0],
      },
    };
    const expectedState = {
      posts: [],
      searchby: "",
      searchquery: "",
    };
    expect(postReducer(initialState, action)).toEqual(expectedState);
  });
});
