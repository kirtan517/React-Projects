import * as api from "../api";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type : "START_LOADING"});
    const {data}  = await api.fetchPosts(page);
    const action = { type: "FETCH_ALL", payload: data };
    dispatch(action);
    dispatch({type:"END_LOADING"});
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = (id) => async (dispatch) =>{
  try{
    dispatch({type: "START_LOADING"});
    const {data} = await api.fetchPost(id);
    const action = {type : "FETCH_POST",payload : data};
    dispatch(action);
    dispatch({type:"END_LOADING"});
  }catch(error){
    console.log(error.message);
  }
}

export const getRandomPost = (id) => async (dispatch) =>{
  try{
    dispatch({type: "START_LOADING"});
    const {data} = await api.fetchRandomPost(id);
    const action = {type : "FETCH_RANDOM_POST", payload : data};
    dispatch(action);
    dispatch({type: "END_LOADING"});
  }catch(error){
    console.log(error.message)
  }
}


export const getSearchByPost = (search) => async(dispatch) =>{
  try{
    dispatch({type : "START_LOADING"});
      const {data} = await api.getSearchByPost(search);
      
      dispatch({type : "FETCH_BY_SEARCH", payload : data.data});
    dispatch({type : "END_LOADING"});
  }catch(error){
      console.log(error)
  }
}

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
