import React from "react";
import { msgReducer } from "./msgReducer";

describe("msgReducer", () => {
  it("should return the initial state", () => {
    expect(msgReducer(undefined, {})).toEqual({
      message: null,
    });
  });
  it("should set a message", () => {
    const initialState = {
      message: "",
    };
    const action = {
      type: "SET_MESSAGE",
      payload: "test message",
    };
    const expectedState = {
      message: "test message",
    };
    expect(msgReducer(initialState, action)).toEqual(expectedState);
  });

  it("should clear a message", () => {
    const initialState = {
      message: "test message",
    };
    const action = {
      type: "CLEAR_MESSAGE",
    };
    const expectedState = {
      message: "",
    };
    expect(msgReducer(initialState, action)).toEqual(expectedState);
  });
});