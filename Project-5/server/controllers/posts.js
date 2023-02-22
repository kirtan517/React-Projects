import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async(req,res) =>{
  const id = req.params.id;
  const { title, message, creator, selectedFile, tags } = req.body;
  const updatedPost = {title,message,creator,selectedFile,tags,_id : id};
  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with the id : ${id}`);
  try{
    await PostMessage.findByIdAndUpdate(id,updatedPost,{new : true});
    res.json(updatePost);
  }catch(error){
    res.status(500).send("Internal Server error");
  }

}
export const deletePost = async(req,res)=>{
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id))
  return res.status(404).send(`No post with the id : ${id}`);

  await PostMessage.findByIdAndRemove(id);
  res.json({message : "Post deleted Successfully"});
}

export const likePost = async(req,res) =>{
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id))
  return res.status(404).send(`No post with the id : ${id}`);

  const post = await PostMessage.findById(id);
  const data = await PostMessage.findByIdAndUpdate(id,{likeCount : post.likeCount + 1},{new : true});
  res.json(data);
}
