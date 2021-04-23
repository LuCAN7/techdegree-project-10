import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        firstName: name,
        lastName: 'password', // api requires a lastname but react/form doesn't have a input field
        emailAddress: email,
        password: confirmPassword,
      }),
    }).then((res) => console.log('HERE==>>', res));
    // res.json())
    // .then((resJSON) => {
    //   console.log(resJSON);
    //   // props.history.push('/create');
    // });
  };

  const handleCancel = (e) => {
    props.history.push('/');
  };

  return (
    <main>
      <div className='form--centered'>
        <h2>Sign Up</h2>

        <form>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            name='name'
            type='text'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor='emailAddress'>Email Address</label>
          <input
            id='emailAddress'
            name='emailAddress'
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button className='button' type='submit' onClick={handleSignup}>
            Sign Up
          </button>
          <button className='button button-secondary' onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{' '}
          <Link to='/signin'>sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;
