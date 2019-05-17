import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";

import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Madhu",
        address: {
          street: "main",
          zip: "66405"
        },
        email: "eample@example.com"
      },
      method: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };
  render() {
    const disabled = { ...this.state.ingredients };
    for (let key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>

        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          disabled={disabled}
          removeIngredient={this.removeIngredientHandler}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </React.Fragment>
    );
  }

  updatePurchaseState(newIngredients) {
    const ingredients = {
      ...newIngredients
    };
    const sum = Object.keys(ingredients)
      .map(ing => {
        return ingredients[ing];
      })
      .reduce((sum, val) => {
        return sum + val;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const count = oldCount + 1;
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = count;
    const newState = {
      ingredients: newIngredients,
      totalPrice: this.calculatePrice(newIngredients)
    };
    this.setState(newState);
    this.updatePurchaseState(newIngredients);
  };

  calculatePrice(ingredients) {
    return Object.keys(ingredients).reduce((price, ing) => {
      return (price += INGREDIENT_PRICES[ing] * ingredients[ing]);
    }, 4);
  }

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount < 1) {
      return;
    }
    const count = oldCount - 1;
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = count;
    const newState = {
      ingredients: newIngredients,
      totalPrice: this.calculatePrice(newIngredients)
    };
    this.setState(newState);
    this.updatePurchaseState(newIngredients);
  };
}

export default withErrorHandler(BurgerBuilder);
