import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from "react-router-dom";
import {
    Grid,
    Box,
    Typography,
  
  } from "@material-ui/core";

export default function Nav() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container 
    justify="center"
    >
    <Grid item ><nav ><Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
    Open my fabulous Menu
  </Button>
  <Menu
    id="simple-menu"
    anchorEl={anchorEl}
    keepMounted
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem onClick={handleClose}> <NavLink to="/" exact activeClassName="active">
      Gooo ...Home
    </NavLink></MenuItem>
    <MenuItem onClick={handleClose}><NavLink to="/search" activeClassName="active">Search for amazing recipes</NavLink></MenuItem>
  </Menu></nav></Grid>
    </Grid>
      
    
  );
}