import mongoose from "mongoose";
import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signin = async(req,res)=>{

    const {email,password } = req.body;

    try{
        const isUserPresent = await User.findOne({email});

        if(!isUserPresent)
        return res.status(404).json({message : "No such user exist"});

        const isPasswordCorrect = await bcrypt.compare(password,isUserPresent.password);

        if(!isPasswordCorrect) return res.status(400).json({message : "Wrong password "});

      

        const token = jwt.sign({email : isUserPresent.email , id : isUserPresent._id},'test',{expiresIn : "1h"});

        res.status(200).json({result : isUserPresent, token})

    }catch(error){
        res.status(500).json({message : "Internal Server Error"})
    }

}


export const signup = async(req,res) =>{

    const {email,password, confirmPassword, firstName, lastName} = req.body;


    try{
        const isUserPresent = await User.findOne({email});
        if(isUserPresent)
        return res.status(404).json({message : "User already exist"});

        if(password !== confirmPassword) return res.status(400).json({message : "Password didn't match"});


        

        const hashedPassword = await bcrypt.hash(password,10);


        const result = await User.create({name : `${firstName} ${lastName}`,password : hashedPassword , email : email});

      

        const token = jwt.sign({email : result.email, id : result._id}, "test", {expiresIn : "1h"});


        res.status(200).json({result : result , token});

    }catch{
        res.status(500).json({message : "Internal Server Error"})
    }
}