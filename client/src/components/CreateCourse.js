import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { CourseContext } from './context/CourseContext';

const CreateCourse = (props) => {
  const { user } = useContext(AuthContext);
  const { actions } = useContext(CourseContext);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);

  const handleCreate = (e) => {
    e.preventDefault();

    const newCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: user.userId,
    };

    actions
      .addCourse(newCourse)
      .then((errors) => {
        // Similar logic derived from UpdateCourse.js
        if (errors && errors.length > 0) {
          setErrors(errors);
          props.history.push('/create');
          return;
        } else if (title && description) {
          setErrors([]);
          props.history.push('/');
          return;
        } else {
          props.history.push('/create');
        }
      })
      .catch((error) => console.error('Catch Errors:', error));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    props.history.push('/');
  };

  return (
    <main>
      <div className='wrap'>
        <h2>Create Course</h2>
        {errors.length === 0 ? (
          ' '
        ) : (
          <div className='validation--errors'>
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((e, i) => {
                return <li key={i}>{e}</li>;
              })}
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
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor='courseAuthor'>Course Author</label>
              <input
                id='courseAuthor'
                name='courseAuthor'
                type='text'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />

              <label htmlFor='courseDescription'>Course Description</label>
              <textarea
                id='courseDescription'
                name='courseDescription'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor='estimatedTime'>Estimated Time</label>
              <input
                id='estimatedTime'
                name='estimatedTime'
                type='text'
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
              />

              <label htmlFor='materialsNeeded'>Materials Needed</label>
              <textarea
                id='materialsNeeded'
                name='materialsNeeded'
                value={materialsNeeded}
                onChange={(e) => setMaterialsNeeded(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button className='button' type='submit' onClick={handleCreate}>
            Create Course
          </button>
          <button className='button button-secondary' onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
