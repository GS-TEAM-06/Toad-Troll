import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>

        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        {props.name === 'signup' ? (
          <div>
            <div>
              <label htmlFor="firstname">
                <small>First name</small>
              </label>
              <input name="firstname" type="text" />
            </div>

            <div>
              <label htmlFor="lastname">
                <small>Last name</small>
              </label>
              <input name="lastname" type="text" />
            </div>

            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
          </div>
        ) : null}

        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password ? evt.target.password.value : null;
      const firstname = evt.target.firstname
        ? evt.target.firstname.value
        : null;
      const lastname = evt.target.lastname ? evt.target.lastname.value : null;
      const email = evt.target.email ? evt.target.email.value : null;
      dispatch(
        authenticate(username, password, firstname, lastname, email, formName)
      );
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
