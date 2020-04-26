import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "../components/HomePage";
import AuthForm from "../components/AuthForm";
import { removeError } from "../store/actions/errors";
import { authUser } from "../store/actions/auth";
import MessageTimeLine from "../components/MessageTimeline";
import { withAuth } from "../hocs/withAuth";
import MessageForm from "./MessageForm";
const Main = props => {
  const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className="container">
      <Switch>
        <Route
          exact
          path="/"
          render={props => <HomePage currentUser={currentUser} {...props} />}
        />
        <Route
          exact
          path="/signin"
          render={props => {
            return (
              <AuthForm
                onAuth={authUser}
                removeError={removeError}
                errors={errors}
                buttonText="Log In"
                heading="Welcome Back"
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/signup"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                signUp
                buttonText="Log In"
                heading="Join Warbler"
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/users/:id/messages/new"
          component={withAuth(MessageForm)}
        />
      </Switch>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}
export default withRouter(
  connect(mapStateToProps, { authUser, removeError })(Main)
);
