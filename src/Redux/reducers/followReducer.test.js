import React from "react";
import Users from "../../Data/Users";
import Posts from "../../Data/Users";
import { followReducer } from "./followReducer";

describe("followReducer", () => {
  it("should return the initial state", () => {
    expect(followReducer(undefined, {})).toEqual({
      allUsers: null,
      followings: null,
    });
  });
  it("should get all users", () => {
    const initialState = {
      allUsers: [],
      followings: [],
    };
    const action = {
      type: "GET_ALL_USERS",
      payload: Users,
    };
    const expectedState = {
      allUsers: Users,
      followings: [],
    };
    expect(followReducer(initialState, action)).toEqual(expectedState);
  });
  it("should get following users", () => {
    const initialState = {
      allUsers: [],
      followings: [],
    };
    const action = {
      type: "GET_FOLLOWING_USERS",
      payload: Users,
    };
    const expectedState = {
      allUsers: [],
      followings: Users,
    };
    expect(followReducer(initialState, action)).toEqual(expectedState);
  });
  it("should add following user and related posts", () => {
    const initialState = {
      allUsers: [],
      followings: [],
    };
    const action = {
      type: "ADD_FOLLOWING_USER",
      payload: Users[0],
    };
    const expectedState = {
      allUsers: [],
      followings: [Users[0]],
    };
    expect(followReducer(initialState, action)).toEqual(expectedState);
  });
  it("should delete following user and related posts", () => {
    const initialState = {
      allUsers: [],
      followings: Users,
    };
    const action = {
      type: "DELETE_FOLLOWING_USER",
      payload: Users,
    };
    const expectedState = {
      allUsers: [],
      followings: Users,
    };
    expect(followReducer(initialState, action)).toEqual(expectedState);
  });
});

