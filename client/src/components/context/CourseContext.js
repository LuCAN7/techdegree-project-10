import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from './context/AuthContext';

export const CourseContext = React.createContext();

const CourseContextProvider = (props) => {
  // const { user, isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  // const [course, setCourse] = useState({});

  function getCourse() {
    const apiBaseUrl = `http://localhost:5000/api/courses`;
    fetch(apiBaseUrl)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setCourses(data);
      });
  }

  useEffect(() => {
    getCourse();
    setIsLoading(true);
    //  return () => {
    //    cleanup
    //  }
  }, []);

  const handleAddCourse = (course) => {
    // console.log('USER IN COURSE', user);
    // console.log(isLoggedIn);
    setCourses((prevState) => {
      return [
        ...prevState,
        {
          course,
          user: 0,
        },
      ];
    });
  };

  const handleRemoveCourse = (id) => {
    setCourses((prevState) => prevState.filter((p) => p.id !== id));
  };

  const handleUpdateCourse = (id) => {
    console.log(id);
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        isLoading,
        actions: {
          addCourse: handleAddCourse,
          removeCourse: handleRemoveCourse,
          updateCourse: handleUpdateCourse,
        },
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseContextProvider;
