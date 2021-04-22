import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const UserSignIn = (props) => {
  const { isLoggedIn, signIn, signOut } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
    props.history.push('/');
    // console.log(props);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    signIn(username, password);
    setUsername('');
    setPassword('');
    // props.history.push('/create');
  };

  return (
    <main>
      <div className='form--centered'>
        <h2>Sign In</h2>

        <form className='form'>
          <label htmlFor='emailAddress'>Email Address</label>
          <input
            id='emailAddress'
            name='emailAddress'
            type='email'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htlmFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='button' type='submit' onClick={handleSignin}>
            Sign In
          </button>
          <button className='button button-secondary' onClick={handleSignout}>
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
