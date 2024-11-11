const express = require("express");
const {validatetheSignUpData} = require("../utils/validation");
const bcrypt=require("bcrypt");
const User = require("../models/User");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
          try {
              // Validate the sign-up data
              validatetheSignUpData(req);
      
              const { firstName, lastName, emailId, password } = req.body;
      
              // Hash the password
              const passwordHash = await bcrypt.hash(password, 10);
      
              // Create a new user with hashed password
              const user = new User({
                  firstName,
                  lastName,
                  emailId,
                  password: passwordHash
              });
      
              // Save the user data
              const savedUser = await user.save();
              const token =await savedUser.getJWT();
              res.cookie("token",token,{expires:new Date(Date.now() + 8 * 3600000)});
              // Send response after saving
              res.json({message:"User added succesfully",data:savedUser});
          } catch (err) {
              res.status(400).send(err.message);
          }
      });
      
authRouter.post("/login",async(req,res)=>{
          try{
              const{emailId,password}=req.body;
              
              const user = await User.findOne({emailId:emailId});
              if(!user){
                  throw new Error("Email ID Invalid");
              }
              const isPasswordValid = await user.validatePassword(password);
              if(isPasswordValid){
                  const token =await user.getJWT();
                  res.cookie("token",token,{expires:new Date(Date.now() + 8 * 3600000)});
                  res.send(user);
                
              }else{
                  throw new Error("Password Invalid");
              }
             
          }catch(err){
              res.status(400).send(err.message);
          }
      })
authRouter.post("/logout", async (req,res)=>{
      res.cookie("token",null,{
          expires: new Date(Date.now())
      });
      res.send("Logout Successfull");
});

module.exports = authRouter;
