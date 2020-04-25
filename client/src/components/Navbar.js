import React from 'react'
import { connect } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../redux';

const Navbar = ({ user, logout }) => {

    const history = useHistory();

    const renderList = () => {
    if(user){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/test">Start Quizz</Link></li>,
        <li>
          <button
            className="btn #f4511e deep-orange darken-1"
            onClick={() => {
              localStorage.clear();
              logout();
              history.push("/login");
            }}
          >
            LogOut
          </button>
        </li>
      ];
    }else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      ];
    }
  }
  return (
    <>
      <nav>
        <div className="nav-wrapper white">
          <Link to={user ? "/" : "/login"} className="brand-logo">
            Quizzz
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>
      <ul className="sidenav sidenav-close" id="mobile-demo">
        <li style={{paddingTop: '8px'}}>
          <Link to={user ? "/" : "/login"} className="brand-logo">
          Quizzz
          </Link>
        </li>
        <li><div className="divider"></div></li>
        {renderList()}
      </ul>
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
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
