import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Submit, SetAns, saveRecord } from '../redux';

const Question = ({no, question, nextQues, prevQues, ans, Submit, SetAns}) => {
    const history = useHistory();
    return (
        <div className="test-card">
            <ul className="collection with-header">
                <li className="collection-header"><h5><strong>{`Q ${no+1}. `}</strong>{question.question}</h5></li>
                <li className="collection-item">
                    <label>
                        <input type="radio" name="question1" onChange={e => SetAns(e.target.value, no)} value={question.optionA} checked={ans[no] === question.optionA} className="with-gap"/>
                        <span>{question.optionA}</span>
                    </label>
                </li>
                <li className="collection-item">
                    <label>
                        <input type="radio" name="question1" onChange={e => SetAns(e.target.value, no)} value={question.optionB} checked={ans[no] === question.optionB} className="with-gap"/>
                        <span>{question.optionB}</span>
                    </label>
                </li>
                <li className="collection-item">
                    <label>
                        <input type="radio" name="question1" onChange={e => SetAns(e.target.value, no)} value={question.optionC} checked={ans[no] === question.optionC} className="with-gap"/>
                        <span>{question.optionC}</span>
                    </label>
                </li>
                <li className="collection-item">
                    <label>
                        <input type="radio" name="question1" onChange={e => SetAns(e.target.value, no)} value={question.optionD} checked={ans[no] === question.optionD} className="with-gap"/>
                        <span>{question.optionD}</span>
                    </label>
                </li>
                <li className="collection-item ques-btns">
                    { no !== 0 ?<button
                            style={{marginRight: '15px'}}
                            className="btn #42a5f5 blue darken-1 q-btn"
                            onClick={() => prevQues(no)}
                            > Previous <i className="material-icons left">chevron_left</i>
                            </button>: ''
                    }
                    {
                    no !== 4 ?<button
                            style={{float: 'right'}}
                            className="btn #42a5f5 blue darken-1 q-btn"
                            onClick={() => nextQues(no)}
                            > Next <i className="material-icons right">chevron_right</i>
                            </button> : <button
                            style={{float: 'right'}}
                            className="btn #42a5f5 blue darken-1 q-btn"
                            onClick={() => { Submit(); history.push('/result')}}
                            > Submit <i className="material-icons right">send</i></button>
                    }
                </li>
            </ul>
        </div>
    )
}



const mapStateToProps = state => {
  return {
      ans: state.questions.answers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Submit: () => dispatch(Submit()),
    SetAns: (ans, no) => dispatch(SetAns(ans, no))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question)
