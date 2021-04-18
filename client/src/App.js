import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CourseContextProvider from './components/context/CourseContext';
import AuthContextProvider from './components/context/AuthContext';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <CourseContextProvider>
            <AuthContextProvider>
              <Route exact path='/' component={Courses} />
              <Route path='/create' component={CreateCourse} />
              <Route path='/:id/update' component={UpdateCourse} />
              <Route path='/courses/:id' component={CourseDetail} />
              <Route path='/signin' component={UserSignIn} />
              <Route path='/signup' component={UserSignUp} />
              <Route path='/signout' component={UserSignOut} />
            </AuthContextProvider>
          </CourseContextProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
