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
