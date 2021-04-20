import React, { useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { CourseContext } from './CourseContext';

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(null);

  // const { courses, actions } = useContext(CourseContext);

  // const authenticatedUser = isAuth;

  // function getUser(username, password) {
  //   const apiBaseUrl = `http://localhost:5000/api/users`;
  //   let encodedCredentials = btoa(`${username}:${password}`);
  //   fetch(apiBaseUrl, {
  //     method: 'GET',
  //     mode: 'cors',
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Basic ${encodedCredentials}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('auth-data-', data);
  //       setUser(data);
  //     })
  //     .catch((err) => console.log(err));
  // }

  useEffect(() => {
    // getUser();
    // setIsLoading(true);
    //  return () => {
    //    cleanup
    //  }
  }, []);

  const signIn = (username, password) => {
    // getUser(username, password);

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
    // console.log('USER', user);

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
      .then((res) => res.json())
      .then((data) => {
        console.log('auth-data-', data);
        if (!data) {
          props.history.push('/signin');
          setIsLoggedIn(false);
          setUser(null);
        } else {
          setIsLoggedIn(true);
          setUser(data);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
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
        // isAuth,
        // credentials: null,
        // token: null,
        // login: () => {},
        // logout: () => {}
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
