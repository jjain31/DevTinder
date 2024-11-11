const express = require("express");
const userAuth = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionrequest");
const User = require("../models/User");
const mongoose=require("mongoose");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:touserId", userAuth, async (req, res) => {
          try {
                    const fromUserId = req.user._id;
                    const toUserId = req.params.touserId;
                    const status = req.params.status;
                    const allowedStatus = ["ignored", "interested"];
                    if (!allowedStatus.includes(status)) {
                              throw new Error("Invalid status type");
                    }
                    if (!mongoose.Types.ObjectId.isValid(toUserId)) {
                              throw new Error("Invalid user ID format");
                          }
                    const toUser = await User.findById(toUserId);

                    if(!toUser){
                              throw new Error("User does not exits");
                    }

                    //if there is an existing connectionRequest

                    const existingConnectionRequest = await ConnectionRequest.findOne({
                              $or:[
                                        {
                                                  fromUserId,
                                                  toUserId
                                        },
                                        {
                                                  fromUserId:toUserId,
                                                  toUserId:fromUserId,
                                        }
                              ]
                              
                    });
                    if(existingConnectionRequest){
                              throw new Error("Existing request");
                    }
                    const connectionRequest = new ConnectionRequest({
                              fromUserId,
                              toUserId,
                              status,
                    });
                    const data = await connectionRequest.save();
                    res.json({
                              message: "Connection request send successfully",
                              data,
                    })
          } catch (err) {
                    res.status(400).send(err.message);
          }
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const status=req.params.status;
        const requestId = req.params.requestId;
        const LoggedInUser = req.user;
        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            throw new Error("Status not allowed");
        }
        const connectionRequest = await ConnectionRequest.findOne({_id:requestId,
          toUserId:LoggedInUser._id,
          status:"interested"
        })
        if(!connectionRequest){
            return res.status(404).send("Connection request not found");
        }
        connectionRequest.status=status;
        const data = await connectionRequest.save();
        res.json({message:"Connection request "+status,data});
    }catch(err){
        res.status(400).send(err.message);
    }
})

module.exports = requestRouter;