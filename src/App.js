import React, { Fragment, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';
//import HomePage from './pages/homepage/homepage';
import Header from './components/header/headerContainer/header';
import Footer from './components/footer/footer';
//import SignIn from './pages/sign-in/sign-in';
//import SignUp from './pages/sign-up/sign-up';
//import MyProfile from './pages/my-profile/my-profile';
//import CreatePlace from './pages/create-place/create-place';
//import Place from './pages/place/place';
//import UpdDelPlace from './pages/updDelPlace/updDelPlace';
//import PasswordResset from './components/passwordResset/passwordResset';
import { selectUser } from './redux/userReducer/user-selector';
import NotFound from './components/not-found/not-found';
import Spinner from './components/spinner/spinner';
import ErrorBoundry from './components/error/error';

const HomePage = lazy(() => import('./pages/homepage/homepage'));
//const NotFound = lazy(() => import('./components/not-found/not-found'));
const MyProfile = lazy(() => import('./pages/my-profile/my-profile'));
const Place = lazy(() => import('./pages/place/place'));
const CreatePlace = lazy(() => import('./pages/create-place/create-place'));
const UpdDelPlace = lazy(() => import('./pages/updDelPlace/updDelPlace'));
const SignIn = lazy(() => import('./pages/sign-in/sign-in'));
const PasswordResset = lazy(() =>
  import('./components/passwordResset/passwordResset')
);
const SignUp = lazy(() => import('./pages/sign-up/sign-up'));

const App = ({ currentUser }) => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <ErrorBoundry>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/place/:placeId" component={Place} />
            <Route exact path="/create-place" component={CreatePlace} />
            <Route
              exact
              path="/update-place/:placeId"
              component={UpdDelPlace}
            />
            <Route exact path="/password-resset" component={PasswordResset} />
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
          </Suspense>
        </ErrorBoundry>
        <Route path="/*" component={NotFound} />
      </Switch>
      <Footer />
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

export default connect(mapStateToProps)(App);
