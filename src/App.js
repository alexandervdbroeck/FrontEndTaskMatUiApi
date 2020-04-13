import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/SearchForm";

export default class App extends Component {
  state = {
    category: {
      data: []
    },
    products: {
      loading: false,
      error: false,
      data: []
    }
  };
  getCat = searchString => {
    this.setState({
      ...this.state,
      products: {
        ...this.state.products,
        loading: true
      }
    });
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchString}&type=video&key=AIzaSyDtXj-yp1hNNaASTmoVNPg0aQdp154kKb4`
      )
      .then(results => {
        this.setState({
          ...this.state,
          category: {
            data: { ...results }
          }
        });
        console.log(results.data.items);
        // console.log(this.state.movies.data);
      })
      .catch(error => {
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
