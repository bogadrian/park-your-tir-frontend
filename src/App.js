import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import Header from './components/header/headerContainer/header';
import Footer from './components/footer/footer';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import MyProfile from './pages/my-profile/my-profile';
import { setCurrentUser } from './redux/userReducer/user-actions';

const App = ({ currentUser }) => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          'https://bogdan-park-your-tir.herokuapp.com/api/v1/places/5e18d897297d1a2a00d5e314'
        );
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/signin"
          render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
        />
        <Route
          exact
          path="/signup"
          render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
        />
        <Route
          exact
          path="/my-profile"
          render={() => (currentUser ? <MyProfile /> : <Redirect to="/" />)}
        />
      </Switch>
      <Footer />
    </Fragment>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
