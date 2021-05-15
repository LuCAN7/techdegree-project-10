import React, { useEffect, useContext } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { CourseContext } from './context/CourseContext';
import Forbidden from './Forbidden';
import NotFound from './NotFound';

const CourseDetail = (props) => {
  const { courses, isLoading, actions } = useContext(CourseContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  let { id } = useParams();
  let auth = true;
  let course = courses.find((c) => c.id == id);
  // console.log('COURSE IS: ', course);
  // Restrict access to updating and deleting courses
  // On the "Course Detail" screen, add rendering logic so that the "Update Course" and "Delete Course" buttons
  // only display if:
  // There's an authenticated user.
  // And the authenticated user's ID matches that of the user who owns the course.

  return (
    <>
      {isLoading ? (
        'Please waiting Loading...'
      ) : (
        <main>
          <div className='actions--bar'>
            {isLoggedIn && course.User.id === user.userId ? (
              <div className='wrap'>
                <Link className='button' to='/:id/update'>
                  Update Course
                </Link>
                <Link className='button' to='/'>
                  Delete Course
                </Link>
                <Link className='button button-secondary' to='/'>
                  Return to List
                </Link>
              </div>
            ) : (
              <div className='wrap'>
                <Link className='button button-secondary' to='/'>
                  Return to List
                </Link>
              </div>
            )}
          </div>
          {course ? (
            <div className='wrap'>
              <h2>Course Detail</h2>
              <form>
                <div className='main--flex'>
                  <div>
                    <h3 className='course--detail--title'>Course</h3>
                    <h4 className='course--name'>{course.title}</h4>
                    <p>
                      By {course.User.firstName} {course.User.lastName}
                    </p>
                    <p>{course.description}</p>
                  </div>
                  <div>
                    <h3 className='course--detail--title'>Estimated Time</h3>
                    <p>{course.estimatedTime}</p>
                    <h3 className='course--detail--title'>{course.title}</h3>
                    <ul className='course--detail--list'>
                      <li>{course.materialsNeeded}</li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <NotFound />
          )}
        </main>
      )}
    </>
  );
};

export default CourseDetail;
