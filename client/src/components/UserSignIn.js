import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const UserSignIn = (props) => {
  const { user, signIn } = useContext(AuthContext);

  const cancelUserSignin = (e) => {
    // console.log(props);
    e.preventDefault();
    // console.log(e.target);
    props.history.push('/');
    // <Redirect to='/' />;
  };
  // let username = 'joe@smith.com';
  // let password = 'joepassword';
  // signIn(username, password);

  return (
    <main>
      <div className='form--centered'>
        <h2>Sign In</h2>

        <form className='form'>
          <label for='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' value='' />
          <label for='password'>Password</label>
          <input id='password' name='password' type='password' value='' />
          <button className='button' type='submit'>
            Sign In
          </button>
          <button
            className='button button-secondary'
            onClick={cancelUserSignin}
          >
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to
          <Link to='/signup'> sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
