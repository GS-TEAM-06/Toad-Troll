import React, { Component } from "react";
import { createCardThunk } from "../store/card";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CreateCard extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: 0,
      description: "",
      quantity: 0,
      category: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createCard({ ...this.state });
    this.setState({
      name: "",
      price: 0,
      description: "",
      quantity: 0,
      category: "",
    });
  }

  render() {
    const { name, price, description, quantity, category } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form id="new-card-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Card Name:</label>
          <input name="name" onChange={handleChange} value={name} />
        </div>

        <div>
          <label htmlFor="price">Card Price:</label>
          <input name="price" onChange={handleChange} value={price} />
        </div>

        <div>
          <label htmlFor="description">Card Description:</label>
          <input
            name="description"
            onChange={handleChange}
            value={description}
          />
        </div>

        <div>
          <label htmlFor="quantity">Card Quantity:</label>
          <input name="quantity" onChange={handleChange} value={quantity} />
        </div>

        <div>
          <label htmlFor="category">Card Category:</label>
          <input name="category" onChange={handleChange} value={category} />
        </div>

        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  createCard: (card) => dispatch(createCardThunk(card, history)),
});

export default connect(null, mapDispatch)(CreateCard);
