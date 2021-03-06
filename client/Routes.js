import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import Cards from './components/Cards';
import Card from './components/Card';
import Cart from './components/Cart';
import User from './components/User';
import GuestCart from './components/GuestCart';
import Checkout from './components/Checkout';
import GuestCheckout from './components/GuestCheckout';

function createGuestCart() {
  const guestCart = [];
  if (!JSON.parse(localStorage.getItem('guestCart'))) {
    localStorage.setItem('guestCart', JSON.stringify(guestCart));
  }
}

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    // create guestCart in local storage when opening browser
    createGuestCart();

    console.log('IN routes, this.props.userId: ', this.props.userId);
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Cards {...props} isLoggedIn={this.props.isLoggedIn} />
              )}
            />
            <Route
              path="/user"
              render={(props) => <User {...props} userId={this.props.userId} />}
            />
            <Route
              path="/cart"
              render={(props) => <Cart {...props} userId={this.props.userId} />}
            />
            <Route path="/cards/:id" component={Card} />
            <Route
              path="/checkout"
              render={(props) => (
                <Checkout {...props} userId={this.props.userId} />
              )}
            />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Cards} />
            <Route path="/cards/:id" component={Card} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={GuestCart} />
            <Route path="/checkout" component={GuestCheckout} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
