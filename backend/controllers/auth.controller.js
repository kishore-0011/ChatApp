import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req,res) => {
    try {
        const {fullName, username,password,confirmPassword,gender} = req.body;


        if (password !== confirmPassword) {
            return res.status(400).json({message:"Password do not match"});
        }

      const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const boyProfilePic =`https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic =`https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender=== "male" ? boyProfilePic : girlProfilePic
        })
        if (newUser) {

            generateTokenAndSetCookie(newUser,res);//generate token and set cookie
            await newUser.save();
        
        res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullName,  
            username:newUser.username,
            profilepic:newUser.profilePic
        });
    }   else{
            res.status(400).json({message:"Invalid User Data"});
        }

    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
        
    }
    console.log("SignUpuser");
};

export const login = async (req,res) => {
    try {
        const {username,password} = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");
        
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid Credentials"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullname:user.fullName,
            username:user.username,
            profilepic:user.profilePic
        });

     } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
     }
    console.log("Loginuser");
};

export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged Out Successfully"});
        
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
        
    }
    
};