import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import useStyles from "./styles";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Switch, Route, Router, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const classes = useStyles();

  return (
    <GoogleOAuthProvider clientId="436866084784-qio70eakhv0sov1e35he60gg5g5tuun6.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/auth" exact element={<Auth />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
