import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { CourseContext } from './context/CourseContext';

const UpdateCourse = (props) => {
  const { courses, actions, errors } = useContext(CourseContext);
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

  const handleUpdate = (e) => {
    e.preventDefault();
    let updatedCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: user.userId,
    };

    // console.log(Array.isArray(errors));
    console.log('errors', errors);
    // console.log('errors.errors', errors.errors);

    actions.updateCourse(updatedCourse, id);
    if (errors.errors && errors.errors.length > 0) {
      props.history.push(`/${id}/update`);
      return;
    } else {
      // console.log('Update Errors', errors);
      // console.log(title);
      if (title && description) {
        // console.log('there is a title');
        props.history.push('/');
        return;
      } else {
        props.history.push(`/${id}/update`);
        // return;
      }
      // props.history.push('/');
      return;
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    props.history.push(`/courses/${id}`);
  };

  useEffect(() => {
    console.log('useEffect running...');
  }, [errors]);

  return (
    <main>
      <div className='wrap'>
        <h2>Update Course</h2>
        {!errors.errors ? (
          ' '
        ) : (
          <div className='validation--errors'>
            <h3>Validation Errors</h3>
            <ul>
              {
                // Object.values(errors)
                errors.errors.map((e) => {
                  return <li>{e}</li>;
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
              {/* * 1/2 x 3/4 inch parting strip&#13;&#13;
               * 1 x 2 common pine&#13;&#13;
               * 1 x 4 common pine&#13;&#13;
               * 1 x 10 common pine&#13;&#13;
               * 1/4 inch thick lauan plywood&#13;&#13;
               * Finishing Nails&#13;&#13;
               * Sandpaper&#13;&#13;
               * Wood Glue&#13;&#13;
               * Wood Filler&#13;&#13;
               * Minwax Oil Based Polyurethane
               * */}

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
    </main>
  );
};

export default UpdateCourse;
