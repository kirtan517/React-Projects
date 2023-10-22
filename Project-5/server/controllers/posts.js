import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	const { page } = req.query;

	try {
		const LIMIT = 3;
		const startIndex = (Number(page) - 1) * LIMIT;

		const total = await PostMessage.countDocuments({});
		const posts = await PostMessage.find()
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);

		res.status(200).json({
			data: posts,
			currentPage: Number(page),
			numberOfPages : Math.ceil(total / LIMIT),
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getPostByRandom = async(req,res) =>{
	const id = req.params.id;
	try{
		const posts = await PostMessage.find({ "_id" : { $nin : [id]}});

		const index = Array.apply(null, {length: posts.length}).map(Number.call, Number);
		function shuffle(array) {
			return [...array].sort(() => Math.random() - 0.5);
		}
		
		const results = posts.slice(0,6);
		
		res.status(200).json({data : results});

	}catch(error){ 
		res.status(404).json({ message: error.message });
	}
}

export const getPost = async(req,res)=>{
	const id = req.params.id;

	try{
		const post = await PostMessage.findById(id);
		res.status(200).json(post);

	}catch(error){
		res.status(404).json({ message: error.message });
	}
}

export const getPostBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query;
	try {
		const title = new RegExp(searchQuery, "i");
		const posts = await PostMessage.find({
			$or: [{ title }, { tags: { $in: tags.split(",") } }],
		});

		res.json({ data: posts });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPosts = async (req, res) => {
	const post = req.body;
	const newPost = PostMessage({
		...post,
		creator: req.userId,
		createdAt: new Date().toISOString(),
	});

	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const id = req.params.id;
	const { title, message, creator, selectedFile, tags } = req.body;
	const updatedPost = { title, message, creator, selectedFile, tags, _id: id };
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with the id : ${id}`);
	try {
		await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
		res.json(updatePost);
	} catch (error) {
		res.status(500).send("Internal Server error");
	}
};
export const deletePost = async (req, res) => {
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with the id : ${id}`);

	await PostMessage.findByIdAndRemove(id);
	res.json({ message: "Post deleted Successfully" });
};

export const likePost = async (req, res) => {
	const id = req.params.id;

	if (!req.userId) return res.json({ message: "Unauthorized" });

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with the id : ${id}`);

	const post = await PostMessage.findById(id);

	const index = post.likes.findIndex((id) => id === req.userId);

	if (index === -1) {
		post.likes.push(req.userId);
	} else {
		post.likes = post.likes.filter((id) => id !== req.userId);
	}

	const data = await PostMessage.findByIdAndUpdate(id, post, { new: true });
	res.json(data);
};
