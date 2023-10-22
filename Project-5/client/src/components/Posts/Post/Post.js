import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	ButtonBase,
} from "@material-ui/core";
import useStyles from "./styles";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/post";
import React from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { useNavigate } from "react-router";

const Post = ({ post, setcurrent_id, isLogedIn, setIsLogedIn }) => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const deleteHandler = () => {
		dispatch(deletePost(post._id));
	};

	const likeHandler = () => {
		dispatch(likePost(post._id));
	};

	const user = JSON.parse(localStorage.getItem("profile"));
	const userName =
		user !== null ? ("googleId" in user ? user.name : user.result.name) : null;
	const userId =
		user !== null ? ("googleId" in user ? user.sub : user.result._id) : null;
	const navigate = useNavigate();

	const Likes = () => {
		if (post.likes.length > 0 && isLogedIn) {
			return post.likes.find(
				(like) =>
					like ===
					(user.googleId || (user.result !== undefined && user.result._id))
			) ? (
				<>
					<ThumbUpAltIcon fontSize="small">&nbsp;</ThumbUpAltIcon>
					{post.likes.length > 2
						? ` You and other ${post.likes.length - 1} likes`
						: ` ${post.likes.length} likes`}{" "}
				</>
			) : (
				<>
					<ThumbUpAltOutlinedIcon fontSize="small">
						&nbsp;
					</ThumbUpAltOutlinedIcon>
					{`${post.likes.length} likes`}
				</>
			);
		}
		return (
			<>
				{" "}
				<ThumbUpAltOutlinedIcon fontSize="small">
					&nbsp;Like
				</ThumbUpAltOutlinedIcon>
			</>
		);
	};

	const handleDetails = () => {
		navigate(`/posts/${post._id}`);
	};

	return (
		<Card className={classes.card}>
			<div onClick={handleDetails}>
				<CardMedia
					className={classes.media}
					image={
						post.selectedFile ||
						"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
					}
					title={post.title}
				/>
				<div className={classes.overlay}>
					<Typography variant="h6">{post.creator}</Typography>
					<Typography variant="body2">
						{moment(post.createdAt).fromNow()}
					</Typography>
				</div>
				<div className={classes.overlay2}>
					<Button
						style={{ color: "white" }}
						size="small"
						onClick={() => setcurrent_id(post._id)}
					>
						<MoreHorizIcon fontSize="default" />
					</Button>
				</div>
				<div className={classes.details}>
					<Typography variant="body2" color="textSecondary" component="h2">
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
				</div>
				<Typography
					className={classes.title}
					gutterBottom
					variant="h5"
					component="h2"
				>
					{post.title}
				</Typography>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{post.message}
					</Typography>
				</CardContent>
			</div>
			<CardActions className={classes.cardActions}>
				<Button
					size="small"
					disabled={user === null}
					color="primary"
					onClick={() => likeHandler()}
				>
					<Likes></Likes>
				</Button>
				{isLogedIn && userId === post.creator && (
					<Button size="small" color="primary" onClick={() => deleteHandler()}>
						<DeleteIcon fontSize="small" /> Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
