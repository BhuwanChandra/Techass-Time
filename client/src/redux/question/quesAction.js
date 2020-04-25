import {
    FETCH_QUESTION_REQUEST,
    FETCH_QUESTION_SUCCESS,
    FETCH_QUESTION_FAILURE,
    SUBMIT,
    SETANS,
    SETQSTATE
} from './quesType';
import { authUser } from '../user/userAction';
import M from 'materialize-css';

export const fetchQuestionsRequest = (level) => {
    return {
        type: FETCH_QUESTION_REQUEST,
        payload: level
    }
}

export const fetchQuestionsSuccess = (questions) => {
    return {
        type: FETCH_QUESTION_SUCCESS,
        payload: questions
    }
}

export const fetchQuestionsFailure = (err) => {
    return {
        type: FETCH_QUESTION_FAILURE,
        payload: err
    }
}

export const Submit = () => {
    return {
        type: SUBMIT
    }
}

export const SetAns = (ans, no) => {
    return {
        type: SETANS,
        payload: {ans, no}
    }
}

export const SetQstate = (qstate = null) => {
    return {
        type: SETQSTATE,
        payload: qstate
    }
}

export const saveRecord = (questions) => {
    return (dispatch) => {
        fetch(`/saverecord`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`
          },
          body: JSON.stringify({
            result: questions.result,
            level: questions.level
          })
        })
          .then(res => res.json())
          .then(response => {
            console.log(response);
            localStorage.setItem("user", JSON.stringify(response));
            dispatch(authUser(response));
            M.toast({ html: "Result saved successfully!", classes: "#43a047 green darken-1" });
          })
          .catch(error => {
            console.log(error);
          });
    }
}

export const fetchQuestions = (level) => {
    return (dispatch) => {
        dispatch(fetchQuestionsRequest(level))
        fetch(`/getquestions?level=${level}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        })
          .then(res => res.json())
          .then(response => {
            console.log(response);
            dispatch(fetchQuestionsSuccess(response.questions));
          })
          .catch(error => {
            const errorMsg = error.message;
            dispatch(fetchQuestionsFailure(errorMsg));
          });
    }
}
