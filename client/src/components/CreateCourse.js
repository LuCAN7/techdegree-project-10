import React from 'react';
import { Link } from 'react-router-dom';

const CreateCourse = () => {
  // *--Todo--*
  // []-set a state value for inputs
  // []-define handleUpdate function to 'POST' to db
  // []-console log the response object

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
                // value={title}
              />

              <label HtmlFor='courseAuthor'>Course Author</label>
              <input
                id='courseAuthor'
                name='courseAuthor'
                type='text'
                // value={author}
              />

              <label HtmlFor='courseDescription'>Course Description</label>
              <textarea
                id='courseDescription'
                name='courseDescription'
              ></textarea>
            </div>
            <div>
              <label HtmlFor='estimatedTime'>Estimated Time</label>
              <input
                id='estimatedTime'
                name='estimatedTime'
                type='text'
                // value={estimate}
              />

              <label HtmlFor='materialsNeeded'>Materials Needed</label>
              <textarea id='materialsNeeded' name='materialsNeeded'></textarea>
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
