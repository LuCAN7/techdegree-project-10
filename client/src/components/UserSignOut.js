import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const UserSignOut = (props) => {
  const { signOut } = useContext(AuthContext);
  // This should: Remove the authenticated user and password from the global state.
  signOut();
  // props.history.push('/');

  return (
    <>
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
    </>
  );
};

export default UserSignOut;
