import React from "react";
import Logo from "../img/header_salm.jpg";
import {
  Grid,
  Box,
  Typography,
  

} from "@material-ui/core";

export default props => {
  return (
    <header>
      <Grid container spacing={2}
      justify="center">
        <Grid item ms={6}><img src={Logo} alt="logo" height="200" /></Grid>
      <Grid item ms={6}>     <Typography component="div">
      <Box noWrap letterSpacing={6} m={5}>
        Njamie Njamie
      </Box>
    </Typography></Grid>
      </Grid>
      
 
    </header>
  );
};
