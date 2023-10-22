import Post from "./Post/Post";
import React from "react";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";


const Posts = ({ setcurrent_id, isLogedIn, setIsLogedIn }) => {
	const {posts,isLoading} = useSelector((state) => {
		return {posts : state.posts.posts , isLoading : state.posts.isLoading};
	});


	if(!posts.length && !isLoading){
		return "No posts";
	}

	const classes = useStyles();

	return (
		<>
			{isLoading ? (
				<CircularProgress />
			) : (
				<Grid
					className={classes.container}
					container
					alignItems="stretch"
					spacing={3}
				>
					{posts.map((post) => (
						<Grid key={post._id} item xs={12} sm={6} md={6}>
							<Post
								post={post}
								setcurrent_id={setcurrent_id}
								setIsLogedIn={setIsLogedIn}
								isLogedIn={isLogedIn}
							/>
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
};

export default Posts;
