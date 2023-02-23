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
import { GoogleLogin } from "react-google-login";
import icon from "./icon";

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
  const googleFailure = () => {
    console.log("Google success was a failure try again latter!");
  };
  const googleSuccess = (res) => {
    console.log(res);
  };
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
          <Grid item xs= {12} sm = {12}>
            <GoogleLogin
              clientId="GOOGLE ID"
              render={(renderPorps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderPorps.onClick}
                  disabled={renderPorps.disabled}
                  startIcon={<icon />}
                  variant="contained"
                >
                  Google Sing In
                </Button>
              )}
              onFailure={googleFailure}
              onSuccess={googleSuccess}
              cookiePolicy="single_host_origin"
            ></GoogleLogin>
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
