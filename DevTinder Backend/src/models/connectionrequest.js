const mongoose = require("mongoose");
const {
          Schema
} = mongoose;

const connectionRequestSchema = new Schema({
          fromUserId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref : "User",
                    required:true,
          },
          toUserId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required:true,
                    ref:"User",
          },
          status: {
                    type: String,
                    required:true,
                    enum: {
                              values: ["ignored", "interested", "accepted", "rejected"],
                              message: `{Value} is incorrect type`
                    }
          },
},{
          timestamps:true,
});
connectionRequestSchema.index({fromUserId:1,toUserId:1});
connectionRequestSchema.pre("save",function(next){
         const connectionRequest =this;
          if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
                    throw new Error("Cannot send request to yourself");
          }
          next();
})
const connectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = connectionRequest;