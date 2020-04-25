import { combineReducers } from "redux";
import userReducer from './user/userReducer';
import quesReducer from './question/quesReducer';

const rootReducer = combineReducers({
    user: userReducer,
    questions: quesReducer
})

export default rootReducer;
