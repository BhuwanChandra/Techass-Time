import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import { authUser } from '../redux';

const Login = ({authUser}) => {
    const history = useHistory();
    const [password, setPassword] = useState(undefined);
    const [email, setEmail] = useState(undefined);

    const PostData = () => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({ html: "Invalid Email", classes: '#e53935 red darken-1' });
      return;
    }
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        if(data.error)
          M.toast({ html: data.error, classes: '#e53935 red darken-1'})
        else{
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          authUser(data.user);
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          history.push('/profile')
        }
      })
      .catch(err => console.log(err));
    }

    return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">Quizzz</h2>
        <input
          value={email}
          type="email"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="btn #42a5f5 blue darken-1"
          onClick={PostData}
        >
          Login
        </button>
        <h6>
          Don't have an account?
          <Link to="/signup">
            signup
          </Link>
        </h6>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
    return {
        authUser: (user) => dispatch(authUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Login);

