
const mongoose=require('mongoose')
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blogSchema = new Schema({
  firstName: {
          type:String,
          required:true,
          minLength:4,
          maxLength:50,
          index:true,
  },
  lastName: {
          type:String,
  },
  emailId:{
          type:String,
          lowercase:true,
          required:true,
          unique:true,
          trim:true,
          validate(value){
                if( ! validator.isEmail(value)){
                        throw new Error("Invalid email address");
                }
          }
  },
  password:{
          type:String,
          required:true, 
          validate(value){
                if( ! validator.isStrongPassword(value)){
                        throw new Error("Enter Strong Password");
                }
          }
  },
  age:{
          type:Number,
          min:18,
  },
  gender:{
          type:String,
          lowercase:true,
          validate(value){
                    if ( !["male","female","others"].includes(value)){
                              throw new Error("Gender data is wrong");
                    }
          }
  },
  photoUrl:{
          type:String,
          default:"https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
          validate(value){
                if(! validator.isURL(value)){
                        throw new Error("Invalid photo URL");
                }
          }

  },
  about:{
          type:String,
          default:"This is a default about of the user",
  },
  skills:{
          type:[String],
  },
  resetOtp: {
        type: String,
        required: false,
      },
      otpExpiresAt: {
        type: Date,
        required: false,
      },
  
},{
          timestamps:true,
});
blogSchema.index({firstName:1,lastName:1});
blogSchema.methods.getJWT = async function (){
const user = this;
const token = await jwt.sign({_id:user._id},"DevTinder$70",{expiresIn : "1d"});
return token;
}
blogSchema.methods.validatePassword = async function (passwordByUser) {
        const user = this;
        const passwordHash = user.password;
        const isPasswordValid = bcrypt.compare(passwordByUser,passwordHash);
        return isPasswordValid;
        
}
module.exports = mongoose.model("User",blogSchema);

 