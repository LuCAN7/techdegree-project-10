import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <header>
        <div className='wrap header--flex'>
          <h1 className='header--logo'>
            <Link className='Home' to='/'>
              Courses
            </Link>
          </h1>
          <nav>
            <ul className='header--signedout'>
              <li>
                <Link className='signup' to='/signup'>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link className='signin' to='/signin'>
                  Sign In
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>

    // const { context } = this.props;
    //     const authUser = context.authenticatedUser;
    //     return (
    //       <div className="header">
    //         <div className="bounds">
    //           <h1 className="header--logo">MyAuth</h1>
    //           <nav>
    //             {authUser ? (
    //               <React.Fragment>
    //                 <span>Welcome, {authUser.name}!</span>
    //                 <Link to="/signout">Sign Out</Link>
    //               </React.Fragment>
    //             ) : (
    //               <React.Fragment>
    //                 <Link className="signup" to="/signup">Sign Up</Link>
    //                 <Link className="signin" to="/signin">Sign In</Link>
    //               </React.Fragment>
    //             )}
    //           </nav>
    //         </div>
    //       </div>
    //     );
  );
};

export default Header;
