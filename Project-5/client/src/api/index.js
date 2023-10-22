import axios from "axios";

const API = axios.create({baseURL :"http://localhost:8000"})

const url = "http://localhost:8000/posts";

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchRandomPost = (id) => API.get(`/posts/random/${id}`)
export const createPost = (newPost) => API.post("/posts", newPost);
export const getSearchByPost = (search) => API.get(`/posts/search?searchQuery=${search.search || 'none'}&tags=${search.tags}`)
export const updatePost = (id, newPost) => API.patch(`/posts/${id}`, newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`,id);

export const signin = (formData)=> API.post("/users/signin",formData);
export const signup = (formData) => {
    console.log("This is inside the api ",formData);
    return API.post("/users/signup",formData)
};