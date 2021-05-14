import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const CreateCourse = (props) => {
  const { user, auth, error, isLoggedIn } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [estimateTime, setEstimateTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    // let encodedCredentials = btoa(`${user.login}:${user.password}`);
    const value = {
      title,
      description,
      estimateTime,
      materialsNeeded,
      userId: user.userId,
    };
    fetch('http://localhost:5000/api/courses', {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Basic ${encodedCredentials}`,
        // Authorization: `Basic ${auth}`,
        Authorization: `Basic ${user.credentials}`,
      },
    })
      .then((res) => {
        props.history.push('/');
        if (!res.ok) props.history.push('/create');
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className='wrap'>
        <h2>Create Course</h2>
        {/* Validation Errors will go here */}
        <div className='validation--errors'>
          <h3>Validation Errors</h3>
          <ul>
            <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li>
          </ul>
        </div>
        {/*Validation Errors will go here*/}
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
                value={estimateTime}
                onChange={(e) => setEstimateTime(e.target.value)}
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
          <button className='button button-secondary'>Cancel</button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
