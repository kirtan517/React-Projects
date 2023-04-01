import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    email : {type : String , required : true},
    name : {type : String , required : true},
    password : {type : String , required : true},
    id : {type : String}
})

const User = mongoose.model("Users",userSchema);
export default User;