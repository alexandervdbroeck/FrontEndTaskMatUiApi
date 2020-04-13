import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/SearchForm";

export default class App extends Component {
  state = {
    category: {
      data: [],
    },
    products: {
      loading: false,
      error: false,
      data: [],
    },
  };
  getCat = (searchString) => {
    this.setState({
      ...this.state,
      products: {
        ...this.state.products,
        loading: true,
      },
    });
    axios
      .get(
        `https://api.spoonacular.com/recipes/search?${process.env.REACT_APP_SPOON_API_KEY}&query=${searchString}&number=20`
      )
      .then((results) => {
        this.setState({
          ...this.state,
          category: {
            data: { ...results },
          },
        });
        console.log(results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" render={() => <Home getCat={this.getCat} />} />
        </Switch>
      </Layout>
    );
  }
}
