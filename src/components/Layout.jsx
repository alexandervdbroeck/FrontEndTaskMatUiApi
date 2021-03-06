import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav"

export default props => {
  return (
    <Router>
      <Container maxWidth="md">
        <Header />
        <Nav/>
        {props.children}
        <Footer />
      </Container>
    </Router>
  );
};
