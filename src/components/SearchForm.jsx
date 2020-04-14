import React, { Component } from "react";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: {
        value: "",
        error: false
      }
    };
  }

  changeHandler = e => {
    this.setState({
      ...this.state,
      searchField: {
        ...this.state.searchField,
        value: e.target.value,
        error: false
      }
    });
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.state.searchField.value !== "") {
      this.setState({
        ...this.state,
        searchField: {
          ...this.state.searchField,
          error: false
        }
      });
      this.props.getRecipes("&query="+this.state.searchField.value);
    } else {
      this.setState({
        ...this.state,
        searchField: {
          ...this.state.searchField,
          error: true
        }
      });
    }
  };

  render() {
    return (
      <form action="" onSubmit={this.submitHandler}>
        <input
          type="text"
          value={this.state.searchField.value}
          onChange={this.changeHandler}
        />
        <input type="submit" value="search" />
      </form>
    );
  }
}
