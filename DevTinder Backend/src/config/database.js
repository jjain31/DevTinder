const mongoose= require("mongoose");
const connectDb=async()=>{
          await mongoose.connect("mongodb+srv://jainjainam3102:TxEqqSwAmWwKG7SI@namasteworld.stxtv.mongodb.net/DevTinder")
}
module.exports=connectDb;