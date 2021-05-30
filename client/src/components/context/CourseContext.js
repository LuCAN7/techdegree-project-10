import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CourseContext = React.createContext();

const CourseContextProvider = (props) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleFetchCourse = () => {
    fetch('http://localhost:5000/api/courses')
      .then((res) => res.json())
      .then((courseData) => {
        setIsLoading(false);
        setCourses(courseData);
      });
  };

  const handleAddCourse = (course) => {
    fetch('http://localhost:5000/api/courses', {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${user.credentials}`,
      },
    })
      .then((res) => res.json())
      .then((course) => {
        // console.dir(course.Errors);

        setCourses((prevState) => {
          return [
            ...prevState,
            {
              course,
            },
          ];
        });
        handleFetchCourse();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateCourse = (updateCourse, id) => {
    // console.log(typeof updateCourse);
    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateCourse),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${user.credentials}`,
      },
    })
      .then((res) => {
        handleFetchCourse();
        if (!res.ok) {
          return res.json().then((data) => {
            // let err = Object.values(data);
            console.log(typeof data);
            setErrors({ data });
            // setErrors([...errors, data]);
          });
        } else {
          setErrors((prev) => {
            return [];
          });
        }
      })
      .catch((error) => console.error('Catch Errors:', error));
  };

  const handleRemoveCourse = (id) => {
    setCourses((prevState) => prevState.filter((p) => p.id !== id));
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
        errors: errors,
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
