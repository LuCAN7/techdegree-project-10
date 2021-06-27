import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { CourseContext } from './context/CourseContext';
import Forbidden from './Forbidden';

const UpdateCourse = (props) => {
  const { courses, actions } = useContext(CourseContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  let course = courses.find((c) => c.id == id);
  let fullName = `${course.User.firstName} ${course.User.lastName}`;
  const [title, setTitle] = useState('' || course.title);
  const [description, setDescription] = useState('' || course.description);
  const [estimatedTime, setEstimatedTime] = useState(
    '' || course.estimatedTime
  );
  const [materialsNeeded, setMaterialsNeeded] = useState(
    '' || course.materialsNeeded
  );
  const [errors, setErrors] = useState([]);

  const handleUpdate = (e) => {
    e.preventDefault();
    let updatedCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: user.userId,
    };

    actions
      .updateCourse(updatedCourse, id)
      .then((errors) => {
        // console.log('UPDATE ACTION', errors);
        if (errors && errors.length > 0) {
          setErrors(errors);
          props.history.push(`/${id}/update`);
          return;
        } else if (title && description) {
          setErrors([]);
          props.history.push('/');
          return;
        } else {
          props.history.push(`/${id}/update`);
        }
      })
      .catch((error) => console.error('Catch Errors:', error));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    props.history.push('/');
  };

  useEffect(() => {
    // check user.userId to course.User.userId
    console.log(user);
    console.log(course);
    console.log('useEffect running...');
  }, [errors]);

  return (
    <main>
      {user.userId !== course.User.userId ? (
        <div className='wrap'>
          <h2>Update Course</h2>
          {errors.length === 0 ? (
            ' '
          ) : (
            <div className='validation--errors'>
              <h3>Validation Errors</h3>
              <ul>
                {
                  // Object.values(errors)
                  errors.map((e, i) => {
                    return <li key={i}>{e}</li>;
                  })
                }
              </ul>
            </div>
          )}
          <form>
            <div className='main--flex'>
              <div>
                <label htmlFor='courseTitle'>Course Title</label>
                <input
                  id='courseTitle'
                  name='courseTitle'
                  type='text'
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                <label htmlFor='courseAuthor'>Course Author</label>
                <input
                  id='courseAuthor'
                  name='courseAuthor'
                  type='text'
                  placeholder={fullName}
                  disabled
                />

                <label htmlFor='courseDescription'>Course Description</label>
                <textarea
                  id='courseDescription'
                  name='courseDescription'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor='estimatedTime'>Estimated Time</label>
                <input
                  id='estimatedTime'
                  name='estimatedTime'
                  type='text'
                  value={estimatedTime}
                  onChange={(e) => {
                    setEstimatedTime(e.target.value);
                  }}
                />

                <label htmlFor='materialsNeeded'>Materials Needed</label>
                <textarea
                  id='materialsNeeded'
                  name='materialsNeeded'
                  value={materialsNeeded}
                  onChange={(e) => {
                    setMaterialsNeeded(e.target.value);
                  }}
                />
                <button className='button' type='submit' onClick={handleUpdate}>
                  Update Course
                </button>
                <button
                  className='button button-secondary'
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Forbidden />
      )}
    </main>
  );
};

export default UpdateCourse;
