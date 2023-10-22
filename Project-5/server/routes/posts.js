import express from "express";
import { getPosts,createPosts, updatePost, deletePost, likePost,getPostBySearch,getPost,getPostByRandom } from "../controllers/posts.js";
const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/",getPosts);
router.get("/:id",getPost);
router.get("/search",getPostBySearch)
router.get("/random/:id",getPostByRandom);
router.post('/',auth,createPosts);
router.patch('/:id',auth,updatePost);
router.delete("/:id",auth,deletePost);
router.patch("/:id/likePost",auth,likePost);


export default router;