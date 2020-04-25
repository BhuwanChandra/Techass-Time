import { USER, CLEAR } from "./userTypes";

const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return action.payload;
    case CLEAR:
      return null;
    default:
      return state;
  }
};

export default userReducer;