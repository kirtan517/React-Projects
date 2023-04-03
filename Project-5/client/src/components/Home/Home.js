import { Container, Grid, Grow, Paper } from "@material-ui/core";
import React,{ useEffect, useState }from "react";
import { useDispatch } from "react-redux";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { getPosts } from "../../actions/post";
import { json } from "react-router";
import CustomPagination from "../CustomPagination";


const Home = ({isLogedIn,setIsLogedIn}) => {
  const [current_id, setcurrent_id] = useState(0);
  


  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem("profile")!== null){
      setIsLogedIn(true);
    }else{
      setIsLogedIn(false);
    }
  },[isLogedIn])

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
            <Posts setcurrent_id={setcurrent_id} setIsLogedIn={setIsLogedIn} isLogedIn={isLogedIn} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form current_id={current_id} setcurrent_id={setcurrent_id} />
            <Paper elevation={6}>
              <CustomPagination/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
