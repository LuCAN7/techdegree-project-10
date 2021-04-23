import React, { useContext, useState, useEffect } from 'react';

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    //  return () => {
    //    cleanup
    //  }
  }, []);

  const signIn = (username, password) => {
    const apiBaseUrl = `http://localhost:5000/api/users`;

    let encodedCredentials = btoa(`${username}:${password}`);

    fetch(apiBaseUrl, {
      method: 'GET',
      // mode: 'cors',
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Basic ${encodedCredentials}`,
      },
    })
      .then((res) => {
        console.log(res.ok);
        if (!res.ok) {
          const fetchError = new Error('Could not fecth data from resource');
          setError(fetchError.message);
          setUser(null);
          // return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        // console.log('auth data-', data);

        setError(null);
        setUser(data);
        setIsLoggedIn(true);
        // return { user };
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });

    console.log('auth user-', user);
  };

  const signOut = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoggedIn,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
