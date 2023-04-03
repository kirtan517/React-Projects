import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import useStyles from "./styles";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import GoogleAuthProvider from "./components/Auth/GoogleAuthProvider";
import { useState } from "react";
import { redirect } from "react-router-dom";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
	const classes = useStyles();
	const [isLogedIn, setIsLogedIn] = useState(false);
	console.log("This is isLogedIn" , isLogedIn);

	useEffect(()=>{

	},[isLogedIn]);


	return (
		<GoogleAuthProvider>
			<BrowserRouter>
				<Container maxWidth="lg">
					<Navbar isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />
					<Routes>
						<Route path="/" exact element={<Navigate to="/posts"/>} />
						<Route
							path="/posts"
							exact
							element={
								<Home isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />
							}
						/>
						<Route
							path="/posts/search"
							exact
							element={
								<Home isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />
							}
						/>
						<Route path="/posts/:id" exact element={<PostDetails />} />
						<Route
							path="/auth"
							exact
							element={!isLogedIn ? <Auth /> : <Navigate to = "/posts"/>}
						/>
					</Routes>
				</Container>
			</BrowserRouter>
		</GoogleAuthProvider>
	);
};

export default App;
