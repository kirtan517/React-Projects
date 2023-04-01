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
import { useDispatch } from "react-redux";

import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { signUp, signIn } from "../../actions/auth";

// import OAuth2Client from "google-auth-library";
const { OAuth2Client } = require("google-auth-library");
// const { google } = require('googleapis');
const userData = {
	firstName: null,
	lastName: null,
	confirmPassword: null,
	password: null,
	email: null,
};

const Auth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [user, setUser] = useState(userData);

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
	const [isSignedUp, setisSignedUp] = useState(false);
	const [showPassword, setshowPassword] = useState();

	const submitHandler = (e) => {
		e.preventDefault();
		if(isSignedUp){
			signUp(user);
		}else{
			signIn(user);
		}
		
	};
	const handleChange = (e) => {
		setUser({... user , [e.target.name] : e.target.value})
	};

	const handleShowPassword = () =>
		setshowPassword((previousState) => !previousState);
	const switchMode = () => {
		setisSignedUp((previousState) => !previousState);
	};

	// This is where the google logic lies
	const contextValue = useContext(GoogleAuthContext);

	const oAuth2Client = new OAuth2Client(
		contextValue.clientId,
		contextValue.clientSecret,
		"http://localhost:3000/auth"
	);

	useEffect(() => {
		const main = async () => {
			if (searchParams.has("code")) {
				try {
					const data = await oAuth2Client.getToken(searchParams.get("code"));
					const final = jwt(data.tokens.id_token);
					console.log("This is the joe which we are waiting for : ", final);
					dispatch({ type: "AUTH", payload: final });
					navigate("/");
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log("this is the worst thing");
			}
		};
		main();
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
									name="lastName"
									label="Last Name"
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
