import React from "react";
import { Container } from "@material-ui/core";
import useStyles from "./styles";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import GoogleAuthProvider from "./components/Auth/GoogleAuthProvider";
import { useState } from "react";

const App = () => {
	const classes = useStyles();
	const [isLogedIn, setIsLogedIn] = useState(false);

	return (
		<GoogleAuthProvider>
			<BrowserRouter>
				<Container maxWidth="lg">
					<Navbar isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />
					<Routes>
						<Route
							path="/"
							exact
							element={
								<Home isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />
							}
						></Route>
						<Route path="/auth" exact element={<Auth />}></Route>
					</Routes>
				</Container>
			</BrowserRouter>
		</GoogleAuthProvider>
	);
};

export default App;
