import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CourseContext = React.createContext();

const CourseContextProvider = (props) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  // const [errors, setErrors] = useState([]);

  const handleFetchCourse = () => {
    fetch('http://localhost:5000/api/courses')
      .then((res) => res.json())
      .then((courseData) => {
        setIsLoading(false);
        setCourses(courseData);
      });
  };

  const handleAddCourse = async (course) => {
    const response = await fetch('http://localhost:5000/api/courses', {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${user.credentials}`,
      },
    });

    if (response.status === 200) {
      handleFetchCourse();
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data;
      });
    } else {
      // Not handling other error use cases //
      throw new Error();
    }
  };

  const handleUpdateCourse = async (updateCourse, id) => {
    const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateCourse),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${user.credentials}`,
      },
    });

    if (response.status === 204) {
      handleFetchCourse();
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  };

  const handleRemoveCourse = (id) => {
    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${user.credentials}`,
      },
    })
      .then(() => {
        setCourses((prevState) =>
          prevState.filter((p) => p.id !== parseInt(id))
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleFetchCourse();
    setIsLoading(true);
    //  return () => {
    //    cleanup
    //  }
  }, []);

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
