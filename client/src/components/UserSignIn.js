import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const UserSignIn = (props) => {
  const { user, signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const cancelUserSignin = (e) => {
    // console.log(props);
    e.preventDefault();
    props.history.push('/');
  };

  const handleSubmit = () => {
    e.preventDefault();
    console.log(e.currentTarget.name);
    // let username = 'joe@smith.com';
    // let password = 'joepassword';
    // signIn(username, password);
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
