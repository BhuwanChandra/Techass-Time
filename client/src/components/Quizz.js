import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import Question from './Question';
import { fetchQuestions, SetQstate, Submit, saveRecord } from '../redux';

const Quizz = ({qs, fetchQuestions, setQstate, submit, saveRecord}) => {
    const history = useHistory();
    const [ques, setQues] = useState([]);
    const [cques, setCques] = useState(0);
    const [time, setTime] = useState(30);

    useEffect(() => {
        let isMounted = false;
        if(qs.testState === true & time !== 0){
            setTimeout(() => {
                setTime(time-1);
            }, 1000);
        }else if(qs.testState === false) {
            if(!isMounted)
            setTime(30);
        }
        return () => {
            isMounted = true;
        }
    },[time, qs.testState]);

    useEffect(() => {
        setQues(qs.questions);
    }, [qs.questions])

    useEffect(() => {
        setQstate(null);
    }, [])

    const testStart = (level) => {
        fetchQuestions(level);
    }

    const nextQues = (cq) => {
        if(cq !== 4)
            setCques(cq+1);
    }

    const prevQues = (cq) => {
        if(cq !== 0)
            setCques(cq-1);
    }

    return (
        <>
            {
                qs.loading ? <div className="progress">
                            <div className="indeterminate"></div>
                        </div> : ''
            }
            {
                ques.length ? 
                    <div className="result-card card #42a5f5 blue darken-1">
                        <h5> Remaining Time: <strong>{` ${time} seconds`}</strong></h5>
                    </div> : ''
            }
           { !ques.length ?
           <div className="test-start">
                <h3>Select Quizz Level</h3>
                <div className="levels">
                    <button className="btn btn-large #42a5f5 blue darken-1" onClick={() => testStart("easy")}> Easy </button>
                    <button className="btn btn-large #42a5f5 blue darken-1" onClick={() => testStart("medium")}> Medium </button>
                    <button className="btn btn-large #42a5f5 blue darken-1" onClick={() => testStart("hard")}> Hard </button>
                </div>
            </div> :
            <div className="test-card">
            {
                time !== 0 ?<Question no={cques} question={ques[cques]} nextQues={nextQues} prevQues={prevQues} />
                : <div className="levels">
                    <h4>Time Up, Submit you test!</h4>
                    <button className="btn btn-large #42a5f5 blue darken-1" onClick={() => { submit(); history.push('/result')}}> 
                        Submit Quizz <i className="material-icons right">send</i>
                    </button>
                </div>
            }
            </div>
        }
        </>
    )
}



const mapStateToProps = state => {
  return {
      qs: state.questions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuestions: (level) => dispatch(fetchQuestions(level)),
    setQstate: (qstate) => dispatch(SetQstate(qstate)),
    submit: () => dispatch(Submit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quizz)
