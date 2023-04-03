const authReducer = (state = {authData : null} , action)=>{
    switch(action.type){
        case "AUTH":
            console.log(action.payload)
            localStorage.setItem("profile",JSON.stringify(action.payload))
            return state;
        case "LOGOUT":
            localStorage.clear()
            return state;
        default :
        return state;
    }
}
export default authReducer;