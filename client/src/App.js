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
import Private from './components/Private';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <AuthContextProvider>
            <Header />
            <CourseContextProvider>
              <Route exact path='/' component={Courses} />

              <Private path='/create' exact component={CreateCourse} />
              <Private path='/:id/update' component={UpdateCourse} />

              <Route path='/courses/:id' component={CourseDetail} />
              <Route path='/signin' component={UserSignIn} />
              <Route path='/signup' component={UserSignUp} />
              <Route path='/signout' component={UserSignOut} />
              <Route path='/notfound' component={NotFound} />
            </CourseContextProvider>
          </AuthContextProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
