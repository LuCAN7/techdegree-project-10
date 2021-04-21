import React, { useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(null);

  // const authenticatedUser = isAuth;

  useEffect(() => {
    // getUser();
    setIsLoading(true);
    //  return () => {
    //    cleanup
    //  }
  }, []);

  const signIn = (username, password) => {
    // let user = await data.getUser(username, password);
    // if (user !== null) {
    //   setState(() => {
    //     return {
    //       authenticatedUser: user,
    //     };
    //   });

    // const cookieOptions = {
    //   expires: 1, // 1 day
    // };
    // Cookies.set('authenticatedUser', JSON.stringify(user), {
    //   cookieOptions,
    // });

    const apiBaseUrl = `http://localhost:5000/api/users`;

    let encodedCredentials = btoa(`${username}:${password}`);

    return fetch(apiBaseUrl, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          // throw Error('Could not fecth data from resource');
          return Promise.reject(res);
        }
        res.json();
      })
      .then((data) => {
        console.log('auth-data-', data);
        setIsLoggedIn(true);
        setUser(data);
        setIsError(null);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setIsError(err.message);
        // console.log(err);
      });

    // return;
  };

  // const signOut = () => {
  //   // setState({ authenticatedUser: null });
  //   // Cookies.remove('authenticatedUser');
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        signIn,
        // signout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
