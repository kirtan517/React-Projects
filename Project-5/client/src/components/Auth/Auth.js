import {
	Avatar,
	Button,
	Container,
	Grid,
	Paper,
	Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import useStyles from "./styles";
import Input from "./Input";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GoogleAuthContext } from "./GoogleAuthProvider";

import React from "react";
import { useSearchParams } from "react-router-dom";

// import OAuth2Client from "google-auth-library";
const { OAuth2Client } = require("google-auth-library");
// const { google } = require('googleapis');

const Auth = () => {
	// handling the code
	const [searchParams, setSearchParams] = useSearchParams();

	if (searchParams.has("code")) {
		console.log("This is the code :   ", searchParams.get("code"));
	}
	if (searchParams.has("scope")) {
		console.log("This is the scope :   ", searchParams.get("scope"));
	}

	// This is the end

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

	// This is where the google logic lies
	const contextValue = useContext(GoogleAuthContext);

	const googleFailure = (error) => {
		console.log(error);
		console.log("Google success was a failure try again latter!");
	};
	const googleSuccess = (res) => {
		console.log(res);
		const CLIENT =
			"436866084784-qio70eakhv0sov1e35he60gg5g5tuun6.apps.googleusercontent.com";
	};

	const oAuth2Client = new OAuth2Client(
		contextValue.clientId,
		contextValue.clientSecret,
    "http://localhost:3000/auth",
	);

	useEffect(async () => {
		if (searchParams.has("code")) {
			  const data = await oAuth2Client.getToken(searchParams.get("code"));
        console.log("This is the thing you have been waiting for : ",data);
			}
		else{
      console.log("this is the worst thing");
    }
	}, []);

	const Login = () => {
		const authUrl = oAuth2Client.generateAuthUrl({
			access_type: "offline",
			scope: [
				"https://www.googleapis.com/auth/userinfo.email",
				"https://www.googleapis.com/auth/userinfo.profile",
				"openid",
			],
			redirect_uri: "http://localhost:3000/auth",
		});

		const width = 500;
		const height = 600;
		const left = window.screen.width / 2 - width / 2;
		const top = window.screen.height / 2 - height / 2;
		const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
		window.open(authUrl, "Sign in with Google", windowFeatures);

		console.log(authUrl);
	};

	// This is it

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
