import {
	Container,
	Grid,
	Grow,
	Paper,
	AppBar,
	TextField,
	Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../Form/Form";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import Posts from "../Posts/Posts";
import { json } from "react-router";
import CustomPagination from "../CustomPagination";
import useStyles from "./styles";
import ChipInput from "material-ui-chip-input";
import { getSearchByPost } from "../../actions/post";

function useQuery(searchParams) {
	return new URLSearchParams(searchParams.search);
}

const Home = ({ isLogedIn, setIsLogedIn }) => {
	const [current_id, setcurrent_id] = useState(0);

	const query = useQuery(useLocation());
	const page = query.get("page") || 1;

	const searchQuery = query.get("searchQuery");

	const [search, setSearch] = useState();

	const classes = useStyles();

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const [tags, setTags] = useState([]);

	const searchPost = () => {
		if ((search && search.trim()) || tags) {
			dispatch(getSearchByPost({ search, tags: tags.join(",") }));
			navigate(`/posts/search?searchQuery=${search}&tags=${tags.join(",")}`);
		} else {
		}
	};

	useEffect(() => {
		if (localStorage.getItem("profile") !== null) {
			setIsLogedIn(true);
		} else {
			setIsLogedIn(false);
		}
	}, [isLogedIn]);


	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			// Search post
		}
	};

	const handleAdd = (tag) => {
		setTags([...tags, tag]);
	};

	const handleDelete = (tagToDelete) => {
		setTags(tags.filter((tag) => tag !== tagToDelete));
	};

	return (
		<Grow in>
			<Container>
				<Grid
					container
					justifyContent="space-between"
					alignItems="stretch"
					spacing={3}
					className={classes.gridContainer}
				>
					<Grid item xs={12} sm={7}>
						<Posts
							setcurrent_id={setcurrent_id}
							setIsLogedIn={setIsLogedIn}
							isLogedIn={isLogedIn}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<AppBar
							className={classes.appBarSearch}
							position="static"
							color="inherit"
						>
							<TextField
								name="search"
								variant="outlined"
								label="Search Memories"
								fullWidth
								onKeyDown={handleKeyPress}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<ChipInput
								style={{ margin: "10px 0" }}
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
								label="Search Tag"
								variant="outlined"
							/>
							<Button onClick={searchPost} className={classes.searchButton}>
								Search
							</Button>
						</AppBar>
						<Form current_id={current_id} setcurrent_id={setcurrent_id} />
						<Paper elevation={6}>
							<CustomPagination page={page} />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
