import React from 'react'
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout, fetchQuestions } from "../redux";

const Profile = ({user, fetchQuestions}) => {
    const history = useHistory();
    return (
      <>
        {user ? (
          <div className="test-result">
            <div className="result-ans card">
              <h5>{`Name: ${user.name}`}</h5>
              <h5>{`Email: ${user.email}`}</h5>
            </div>
            <div className="p-card card #42a5f5 blue darken-1">
              <h5> Quizz Records </h5>
            </div>
            {user.tests
              ? user.tests.map((el, i) => (
                  <div key={i} className="result-ans card profile-test">
                    <h5>{`${el.level} Level`}</h5>
                    <h5>{`Result: ${el.result}`}</h5>
                    <button
                      className="btn #42a5f5 blue darken-1"
                      onClick={() => {fetchQuestions(el.level); history.push('/test');}}
                    > Try Again </button>
                  </div>
                ))
              : ""}
          </div>
        ) : (
          ""
        )}
      </>
    );
}



const mapStateToProps = state => {
  return {
      user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchQuestions: (level) => dispatch(fetchQuestions(level))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

