import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../App.css";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import Quizz from "./Quizz";
import QuizzResult from "./QuizzResult";
import { authUser, SetQstate } from "../redux";

const Routing = ({authUser, setQstate, questions}) => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // const ques = JSON.parse(localStorage.getItem("questions"));
    if (user) {
      authUser(user);
      // setQstate(ques);
      history.push('/test');
    }
    else
      history.push('/login');
  }, [authUser,setQstate]);
  return (
    <Switch>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/test">
        <Quizz />
      </Route>
      <Route exact path="/result">
        <QuizzResult />
      </Route>
    </Switch>
  );
}


const mapStateToProps = state => {
  return {
    user: state.user,
    questions: state.questions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authUser: (user) => dispatch(authUser(user)),
    setQstate: (qstate) => dispatch(SetQstate(qstate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
