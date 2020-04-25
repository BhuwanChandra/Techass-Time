import React from 'react'
import { connect } from "react-redux";
import { saveRecord } from '../redux';

const QuizzResult = ({questions, saveRecord}) => {
    return (
      <div className="test-result">
        <div className="result-card card #42a5f5 blue darken-1">
          <h4>
            Your General Knowledge is{" "}
            {questions.questions.length ? questions.result : ""}
          </h4>
        </div>
        {questions.questions.length
          ? questions.questions.map((el, i) => (
              <div key={i} className="result-ans card">
                <h5>
                  <strong>Q {` ${i + 1}. `}</strong>
                  {el.question}
                </h5>
                <h6>
                  <span>Correct Answer: </span>
                  {" " + el.answer}
                </h6>
                <h6>
                  <span>Your Answer: </span>
                  {questions.answers[i]
                    ? " " + questions.answers[i]
                    : "Not attempted"}
                </h6>
              </div>
            ))
          : ""}
            <div style={{textAlign: 'center'}} className="result-ans card">
                <button className="btn btn-large #42a5f5 blue darken-1" onClick={() => saveRecord(questions)}> Save Result </button>
            </div>
      </div>
    );
}



const mapStateToProps = state => {
  return {
      questions: state.questions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveRecord: (ques) => dispatch(saveRecord(ques))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizzResult)
