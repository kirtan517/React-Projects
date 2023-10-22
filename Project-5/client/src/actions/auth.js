import { formToJSON } from "axios";
import * as api from "../api";

export const signIn= (formData,navigate) => async(dispatch) =>{

    try{
        // here is what the signIn happens 
        const {data} = await api.signin(formData);

        dispatch({type : "AUTH",payload : data});

        navigate("/");
    
    }catch(error){
        console.log(error);
    }

}



export const signUp = (formData,navigate) => async(dispatch) =>{
    try{
        const {data} = await api.signup(formData);
        
        dispatch({type:"AUTH",payload : {...(data.result),token : (data.token)} });

        navigate("/");

    }catch(error){
        console.log(error);
    }   
    
}