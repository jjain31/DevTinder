const express = require("express");
const userAuth = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionrequest");
const User = require("../models/User");
const { DataArraySharp } = require("@mui/icons-material");
const userRouter = express.Router();
const SAVE_Data = "firstName lastName photoUrl age gender about skills"
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
          try {
                    const LoggedInUser = req.user;
                    const connectionrequest = await ConnectionRequest.find({
                              toUserId: LoggedInUser._id,
                              status: "interested",
                    }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"]);
                    res.json({
                              message: "Data fetch successfull",
                              data: connectionrequest,
                    })

          } catch (err) {
                    res.status(400).send("ERROR:" + err.message);
          }
})

userRouter.get("/user/connection", userAuth, async (req, res) => {
          try {
                    const LoggedInUser = req.user;
                    const connectionrequest = await ConnectionRequest.find({
                              $or: [{
                                                  toUserId: LoggedInUser._id,
                                                  status: "accepted",
                                        },
                                        {
                                                  fromUserId: LoggedInUser._id,
                                                  status: "accepted",
                                        }
                              ]

                    }).populate("fromUserId", SAVE_Data).populate("toUserId", SAVE_Data);

                    const data = connectionrequest.map(row => {
                              if (row.fromUserId._id.toString() === LoggedInUser._id.toString()) {
                                        return row.toUserId;
                              }
                              return row.fromUserId;
                    });
                    res.json({
                              data
                    })
          } catch (err) {
                    res.status(400).send(err.message);
          }
})

userRouter.get("/feed", userAuth, async (req, res) => {
          try {
                    const page = parseInt(req.query.page) || 1;
                    let limit=parseInt(req.query.limit) || 10;
                    limit = limit>50?50:limit;
                    const LoggedInUser = req.user;
                    const skip = (page-1)*limit;
                    const connectionRequest = await ConnectionRequest.find({
                              $or: [{
                                        fromUserId: LoggedInUser._id,
                              }, {
                                        toUserId: LoggedInUser._id,
                              }]
                    });
                    const hiddenUsersFromFeed = new Set();
                    connectionRequest.forEach((requ) => {
                           hiddenUsersFromFeed.add(requ.fromUserId.toString()); 
                           hiddenUsersFromFeed.add(requ.toUserId.toString());    
                    });

                    const users = await User.find({
                              $and:[
                                        {_id:{$nin: Array.from(hiddenUsersFromFeed)}},
                                         {_id:{$ne:LoggedInUser._id}}
                              ]
                    }).select(SAVE_Data).skip(skip).limit(limit);

                    res.send(users);
          } catch (err) {
                    res.status(400).send(err.message);
          }
})

module.exports = userRouter;