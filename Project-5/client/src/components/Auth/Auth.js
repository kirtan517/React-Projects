import {
  Avatar,
  Button,
  Container,
  Grid,
  Icon,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import useStyles from "./styles";
import Input from "./Input";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import icon from "./icon";
import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Auth = () => {
  const classes = useStyles();
  const submitHandler = () => {};
  const [isSignedUp, setisSignedUp] = useState(false);
  const handleChange = () => {};
  const [showPassword, setshowPassword] = useState();
  const handleShowPassword = () =>
    setshowPassword((previousState) => !previousState);
  const switchMode = () => {
    setisSignedUp((previousState) => !previousState);
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google success was a failure try again latter!");
  };
  const googleSuccess = async (res) => {
    console.log(res);
    const CLIENT =
      "436866084784-qio70eakhv0sov1e35he60gg5g5tuun6.apps.googleusercontent.com";
      
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(result);
  };
  const Login = useGoogleLogin({
    onFailure: googleFailure,
    onSuccess: googleSuccess,
    cookiePolicy: "single_host_origin",
  });
  return (
    <Container component="main" maxWidth="xs" spacing={2}>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">
          {isSignedUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {isSignedUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignedUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            <Grid item xs={12} sm={12}>
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={() => Login()}
                // disabled={renderPorps.disabled}
                startIcon={<icon />}
                variant="contained"
              >
                Google Sing In
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignedUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignedUp
                  ? "Already have an account ? Sing In"
                  : "Don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
