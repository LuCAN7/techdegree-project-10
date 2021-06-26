import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // signIn();
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
        // console.log('//GET - User res SignIn--->', res);
        // return Promise.reject(res);
        if (!res.ok) {
          setUser(null);
        }

        return res.json();
      })
      .then((data) => {
        setUser((prevState) => {
          data.credentials = encodedCredentials;
          return data;
        });

        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log('SIGNIN ERROR--->', err.message);
        setError(err.message);
      });
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
