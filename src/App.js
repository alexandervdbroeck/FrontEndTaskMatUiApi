import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/homepage";
import SearchResult from "./components/SearchResult";
import SearchForm from "./components/SearchForm";
import Detail from "./components/Detail";
import LinearProgress from "@material-ui/core/LinearProgress";

export default class App extends Component {
  state = {
    recipes: {
      loading: false,
      error: false,
      errorMessage: "",
      dataReceived: false,
      data: [],
      steps: [],
    },
  };

  getRecipes = (searchString) => {
    this.setState({
      ...this.state,
      recipes: {
        ...this.state.recipes,
        loading: true,
      },
    });
    axios
      .get(
        `https://api.spoonacular.com/recipes/search?${process.env.REACT_APP_SPOON_API_KEY}${searchString}&number=20`
      )
      .then((results) => {
        this.setState({
          ...this.state,
          recipes: {
            ...this.state.recipes,
            imgBaseUri: results.data.baseUri,
            data: { ...results.data },
            dataReceived: true,
            loading: false,
            error: false,
            errorMessage: "",
          },
        });
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          recipes: {
            ...this.state.recipes,
            error: true,
            errorMessage: error,
          },
        });
      });
  };

  render() {
    return (
      <Layout>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Home />;
            }}
          />
          <Route
            exact
            path="/search"
            render={() => {
              return (
                <>
                  <SearchForm getRecipes={this.getRecipes} />
                  {/*loading message*/}
                  {this.state.recipes.loading && (
                    <div>
                      <LinearProgress />
                      <LinearProgress color="secondary" />
                    </div>
                  )}
                  {this.state.recipes.dataReceived && (
                    <SearchResult test={this.state.recipes.data} />
                  )}
                </>
              );
            }}
          />
          <Route
            path="/recipe/:id/:title"
            render={(props) => {
              return <Detail {...props} />;
            }}
          />
          >
        </Switch>
      </Layout>
    );
  }
}
