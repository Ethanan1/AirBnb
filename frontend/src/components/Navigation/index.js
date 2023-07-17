import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import ReviewDetail from '../ReviewDetails/ReviewDetails';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <nav className="navbar_user">
      <ProfileButton user={sessionUser.id} />
      </nav>
      <div>
        <NavLink to="/spots" className="spot" style={{ textDecoration: 'none', color: '#6E6D70'}}>Vacation Homes</NavLink>
      </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
      <nav className="navbar_user">
        <div>
          <button className="button_auth"><NavLink to="/login" style={{ textDecoration: 'none', color: 'white' }}>Log In</NavLink></button>
        &nbsp;
          <button className="button_auth"><NavLink to="/signup" style={{ textDecoration: 'none', color: 'white' }}>Sign Up</NavLink></button>
        </div>
      </nav>
      <div>
        <NavLink to="/spots" className="spot" style={{ textDecoration: 'none', color: '#6E6D70'}}>Vacation Homes</NavLink>
      </div>
      </>
    );
  }

  return (
    <div>
      <NavLink exact to="/" className="home" style={{ color: '#FF5A5F'}}><i className='fab fa-airbnb fa-2x'></i></NavLink><br/>
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
