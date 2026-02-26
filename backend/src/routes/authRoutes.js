import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"

const router = express.Router()

router.post("/register",async(req , res , next)=>{
    try{
        const {name,email,password} = req.body
        if(!name || !email || !password){
            res.status(400)
            throw new Error("All fields are required")
        }
        const exisitingUser = await User.findOne({email})
        if(exisitingUser){
            res.status(400)
            throw new Error("User Already Exists")
        }
        const hashedPass = await bcrypt.hash(password,10)
        const user = await User.create({
            name,email,password:hashedPass
        })
        res.status(201).json({
            message:"User Registered Successfully"
        })
    } catch(error){
        next(error)
    }
})

router.post("/login",async(req,res,next)=>{
    try{
        const{email,password}= req.body;
        if(!email || !password){
            res.status(400);
            throw new Error("Email & Password Required")
        }
        const user = await User.findOne({email})
        if(!user){
            res.status(401)
            throw new Error("Invalid Credentials")
        }
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"2d"}
        )

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==="production",
            sameSite:"strict"
        })
        res.status(200).json({
            message:"Login Success"
        })
    } catch(error){
        next(error)
    }
})

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" })
})

export default router;