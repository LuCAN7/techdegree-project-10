import React, { useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
import { CourseContext } from './CourseContext';

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const { courses, actions } = useContext(CourseContext);

  // const authenticatedUser = isAuth;

  function getUser(username, password) {
    const apiBaseUrl = `http://localhost:5000/api/users`;

    let encodedCredentials = btoa(`${username}:${password}`);

    fetch(apiBaseUrl, {
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
        setUser(data);
      })
      .catch((err) => console.log(err));
  }

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

    fetch(apiBaseUrl, {
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
        setUser(data);
      })
      .catch((err) => console.log(err));

    return user;
  };

  // const signOut = () => {
  //   // setState({ authenticatedUser: null });
  //   // Cookies.remove('authenticatedUser');
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        // isAuth,
        signIn,
        // credentials: null,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
