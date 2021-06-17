import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCard } from "../store/card";
import { addedToCart } from "../store/cart";

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCard(id);
  }

  handleClick() {
    this.props.addedToCart(cardId);
  }

  render() {
    console.log(this.props);
    const { singleCard } = this.props;
    return (
      <div>
        <h3>{singleCard.name}</h3>
        {/* <h3>{singleCard.quantity}</h3> */}
        <img src={singleCard.imageUrl} />
        <h6>{singleCard.description}</h6>
        <h3>{singleCard.price}</h3>
        <button type="button" onClick={this.handleClick}>
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleCard: state.card,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCard: (id) => dispatch(fetchCard(id)),
    addedToCart: (cardId) => dispatch(addedToCart(cardId)),
  };
};

export default connect(mapState, mapDispatch)(Card);