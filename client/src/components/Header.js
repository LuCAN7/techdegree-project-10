import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import UserSignOut from './UserSignOut';

const Header = (props) => {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <div>
      <header>
        <div className='wrap header--flex'>
          <h1 className='header--logo'>
            <Link className='Home' to='/'>
              Courses
            </Link>
          </h1>
          <nav>
            {isLoggedIn ? (
              <ul className='header--signedin'>
                <li>
                  Welcome, {user.firstName} {user.lastName}
                </li>
                <li>
                  <Link to='/signout'>Sign Out</Link>
                </li>
              </ul>
            ) : (
              <ul className='header--signedout'>
                <li>
                  <Link className='signup' to='/signup'>
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link className='signin' to='/signin'>
                    Sign In
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
