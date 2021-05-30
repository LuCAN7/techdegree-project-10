import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { CourseContext } from './context/CourseContext';
import NotFound from './NotFound';

const CourseDetail = (props) => {
  const { courses, isLoading } = useContext(CourseContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  let { id } = useParams();

  let course = courses.find((c) => c.id == id);

  return (
    <>
      {isLoading ? (
        'Please waiting while Loading...'
      ) : (
        <main>
          <div className='actions--bar'>
            {isLoggedIn && course.User.id === user.userId ? (
              <div className='wrap'>
                <Link className='button' to={`/${id}/update`}>
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
