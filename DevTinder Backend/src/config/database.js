const mongoose= require("mongoose");
const connectDb=async()=>{
          await mongoose.connect("mongodb+srv://{database_id}:{password}@namasteworld.stxtv.mongodb.net/DevTinder")
}
module.exports=connectDb;