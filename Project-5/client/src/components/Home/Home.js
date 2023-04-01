import { Container, Grid, Grow } from "@material-ui/core";
import React,{ useEffect, useState }from "react";
import { useDispatch } from "react-redux";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { getPosts } from "../../actions/post";
import { json } from "react-router";

const Home = () => {
  const [current_id, setcurrent_id] = useState(0);


//   const classes = useStyles();
  console.log("This is the home Page +++++++++++++++++")

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [current_id, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}>

          <Grid item xs={12} sm={7}>
            <Posts setcurrent_id={setcurrent_id} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form current_id={current_id} setcurrent_id={setcurrent_id} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
