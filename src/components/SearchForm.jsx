import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Grid,Box} from '@material-ui/core';

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
      <Box border={1} 
      borderRadius="10px"
      p={{ xs: 2, sm: 3, md: 4 }}>
      <form   fullWidth action="" onSubmit={this.submitHandler}>
        <Grid container
              justify="space-around"
              alignItems="center">   
        <Grid item> <TextField type="text"
          value={this.state.searchField.value}
          onChange={this.changeHandler} id="outlined-basic" label="Search your dish here" variant="outlined" fullWidth/></Grid>
     <Box
      mt={{ xs: 2, sm: 3, md: 4 }}
      mb={{ xs: 2, sm: 3, md: 4 }}><Grid item> <Button type="submit" variant="contained" size="large" color="primary" >Submit</Button></Grid></Box>
         </Grid>    
      </form>

      </Box>

    );
  }
}
