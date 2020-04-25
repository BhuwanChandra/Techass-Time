import {
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  SUBMIT,
  SETANS,
  SETQSTATE
} from "./quesType";

const initialState = {
  loading: false,
  questions: [],
  level: "",
  answers: [],
  result: "",
  testState: false,
  error: ""
};

const results = ["Poor", "Bad", "Good", "Strong", "Very Strong"];

const quesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
        level: action.payload
      };
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.payload,
        testState: true
      };
    case FETCH_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SETANS: {
      let ans = [...state.answers];
      ans[action.payload.no] = action.payload.ans;
      return {
        ...state,
        answers: [...ans]
      };
    }
    case SUBMIT: {
      let score = 0;
      state.answers.forEach((ans, i) => {
        if (ans === state.questions[i].answer) score++;
      });
      return {
        ...state,
        result: results[score !== 0 ? score - 1 : score],
        testState: false
      };
    }
    case SETQSTATE: {
      return action.payload !== null ? action.payload : initialState;
    }
    default:
      return state;
  }
};

export default quesReducer;
