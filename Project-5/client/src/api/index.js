import axios from "axios";

const API = axios.create({baseURL :"http://localhost:8000"})

const url = "http://localhost:8000/posts";

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, newPost) => API.patch(`/posts/${id}`, newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`,id);

export const signin = (formData)=> API.post("/users/signin",formData);
export const signup = (formData) => {
    console.log("This is inside the api ",formData);
    return API.post("/users/signup",formData)
};