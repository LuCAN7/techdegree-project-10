import React, { useState, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Private = ({ component: Component, ...rest }) => {
  const { user, isLoggedIn, error } = useContext(AuthContext);

  // console.log('isLoggedIn', isLoggedIn);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to='/signin' />
      }
    />
  );
};

export default Private;
