import React from "react";
import Users from "../../Data/Users";
import Posts from "../../Data/Users";
import { authReducer } from "./authReducer";

describe("authReducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual({
      isLoggedIn: false,
      user: null,
    });
  });
  it("should login a previously registered user", () => {
    const initialState = {
      isLoggedIn: false,
      user: null,
    };
    const action = {
      type: "LOGIN_SUCCESS",
      payload: {
        user: Users[0],
      },
    };
    const expectedState = {
      isLoggedIn: true,
      user: Users[0],
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it("should not log in an invalid user", () => {
    const initialState = {
      isLoggedIn: false,
      user: null,
    };
    const action = {
      type: "LOGIN_FAIL",
    };
    const expectedState = {
      isLoggedIn: false,
      user: null,
  };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it("should log out a user", () => {
    const initialState = {
      isLoggedIn: true,
      user: Users[0],
    };
    const action = {
      type: "LOGOUT",
    };
    const expectedState = {
      isLoggedIn: false,
      user: null,
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it("should register a new user", () => {
    const initialState = {
      isLoggedIn: false,
      user: null,
    };
    const action = {
      type: "REGISTER_SUCCESS",
      payload: {
          id: 0,
          username: "test",
          password: "test",
          email: "test",
          phone: "test",
          address: {zipcode: "test"},
      },
    };
    const expectedState = {
      isLoggedIn: true,
      user: {
        id: 0,
        username: "test",
        password: "test",
        email: "test",
        phone: "test",
        address: {zipcode: "test"},},
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
});
