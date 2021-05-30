import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const UserSignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState(null);

  const { signIn, signOut } = useContext(AuthContext);
  // const test = false;
  const handleSignup = (e) => {
    e.preventDefault();
    let userName = name.split(' ');

    fetch(`http://localhost:5000/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        firstName: userName[0],
        lastName: userName[1],
        emailAddress: email,
        password: confirmPassword,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.Errors) {
          console.log('SIGNUP - There is an error? HERE==>>', data.Errors);

          setErrors((prev) => data.Errors);
          return errors;
        }
        signIn(email, confirmPassword);
        // props.history.push('/');
      })
      .catch((err) => console.error(err));
    // console.error('There has been a problem with your fetch operation:', error);
  };

  const handleCancel = (e) => {
    signOut();
    props.history.push('/');
  };

  return (
    <main>
      <div className='form--centered'>
        <h2>Sign Up</h2>
        {errors === null ? (
          ''
        ) : (
          <div className='validation--errors'>
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((e, i) => {
                return <li key={i}>{e}</li>;
              })}
            </ul>
          </div>
        )}
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
