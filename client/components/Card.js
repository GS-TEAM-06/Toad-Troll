import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCard } from '../store/card';
import { addedToCart } from '../store/cart';
import axios from 'axios';
import UpdateCard from './UpdateCard';

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCard(id);
  }

  async addToGuestCart(cardId) {
    const { data } = await axios.get(`/api/cards/${cardId}`);
    let guestCart = JSON.parse(localStorage.getItem("guestCart"));
    let guestCartId = guestCart.map((card) => card.id)
    let index = guestCartId.indexOf(data.id)
    if (index === -1) {
        data.quantity = 1
        guestCart.push(data);
    } else {
        guestCart[index].quantity += 1
    }
    localStorage.guestCart = JSON.stringify(guestCart);
  }

  handleClick(event) {
    if (this.props.user.id) {
      const usersId = this.props.user.id;
      const cardsId = event.target.value;
      this.props.addedToCart(usersId, cardsId);
    } else {
      this.addToGuestCart(event.target.value);
    }
  }

  render() {
    const { singleCard, user } = this.props;
    return (
      <div>
        {user.admin ? (
          <div>
            <h3>UPDATE CARD INFORMATION</h3>
            <UpdateCard history={this.props.history} />
          </div>
        ) : (
          <div />
        )}
        <h3>{singleCard.name}</h3>
        {/* <h3>{singleCard.quantity}</h3> */}
        <img src={singleCard.imageUrl} />
        <h6>{singleCard.description}</h6>
        <h3>{'$' + (singleCard.price / 100).toFixed(2)}</h3>
        <button type="button" value={singleCard.id} onClick={this.handleClick}>
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleCard: state.card,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCard: (id) => dispatch(fetchCard(id)),
    addedToCart: (userId, cardId) => dispatch(addedToCart(userId, cardId)),
  };
};

export default connect(mapState, mapDispatch)(Card);
