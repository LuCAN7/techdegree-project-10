import React, { useState } from 'react';

const CreateCourse = () => {
  // *--Todo--*
  // [x]-set a state value for inputs
  // []-define handleUpdate function to 'POST' to db
  // []-console log the response object

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [estimate, setEstimate] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(e.target);
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
        {/******/}
        <form>
          <div className='main--flex'>
            <div>
              <label HtmlFor='courseTitle'>Course Title</label>
              <input
                id='courseTitle'
                name='courseTitle'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label HtmlFor='courseAuthor'>Course Author</label>
              <input
                id='courseAuthor'
                name='courseAuthor'
                type='text'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />

              <label HtmlFor='courseDescription'>Course Description</label>
              <textarea
                id='courseDescription'
                name='courseDescription'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label HtmlFor='estimatedTime'>Estimated Time</label>
              <input
                id='estimatedTime'
                name='estimatedTime'
                type='text'
                value={estimate}
                onChange={(e) => setEstimate(e.target.value)}
              />

              <label HtmlFor='materialsNeeded'>Materials Needed</label>
              <textarea
                id='materialsNeeded'
                name='materialsNeeded'
                value={materialsNeeded}
                onChange={(e) => setMaterialsNeeded(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button className='button' type='submit'>
            Create Course
          </button>
          <button className='button button-secondary' onClick={handleUpdate}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
