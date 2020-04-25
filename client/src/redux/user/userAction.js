import { USER, CLEAR } from "./userTypes";

export const authUser = (user = null) => {
  return {
    type: USER,
    payload: user
  };
};

export const logout = () => {
  return {
    type: CLEAR
  };
};
