import * as api from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    const action = { type: "FETCH_ALL", payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    const action = { type: "CREATE", payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (current_id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(current_id, post);
    const action = { type: "UPDATE", payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (current_id) => async (dispatch) => {
  try {
    await api.deletePost(current_id);
    const action = { type: "DELETE", payload: current_id };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (current_id) => async (dispatch) =>{
    try{
        const {data} = await api.likePost(current_id);
        const action = {type : "LIKE", payload  : data};
        dispatch(action);
    } catch(error){
        console.log(error);
    }
}
