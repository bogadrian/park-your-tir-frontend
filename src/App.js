import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import Header from './components/header/headerContainer/header';
import Footer from './components/footer/footer';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import MyProfile from './pages/my-profile/my-profile';
import CreatePlace from './pages/create-place/create-place';
import Place from './pages/place/place';

const App = ({ currentUser }) => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/place/:placeId" component={Place} />
        <Route exact path="/create-place" component={CreatePlace} />
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

export default connect(mapStateToProps)(App);
