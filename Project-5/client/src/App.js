import React, { useState,useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import { getPosts } from "./actions/post";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

const App = () => {

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Navbar/>
      <Home/>
    </Container>
  );
};

export default App;
