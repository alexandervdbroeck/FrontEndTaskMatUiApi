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
      <Box
      mt={{ xs: 2, sm: 3, md: 4 }}
      mb={{ xs: 2, sm: 3, md: 4 }}>
      <Grid container 
      justify="space-between"
      alignItems="center"
      >
        <Grid item ms={6}><img src={Logo} alt="logo" height="200" /></Grid>
      <Grid item ms={6}>     <Typography align="center" component="div">
      <Box  letterSpacing={10} fontSize="25px" display="block">
        Njamie Njamie
      </Box>
    </Typography></Grid>
      </Grid>
      </Box>
    </header>
  );
};
