const validator = require("validator");
const validatetheSignUpData = (req) => {
          const {
                    firstName,
                    lastName,
                    emailId,
                    password
          } = req.body;
          if (!firstName && !lastName) {
                    throw new Error("Name is not valid");
          } else if (!validator.isEmail(emailId)) {
                    throw new Error("Email is not valid");
          } else if (!validator.isStrongPassword(password)) {
                    throw new Error("Password is not valid");
          }
};
const validatetheProfileData = (req) => {
   const allowedEdits = ["firstName", "lastName", "photoUrl", "gender", "age", "skills", "about"];
 
   // Validate photoUrl
   if (req.body.photoUrl && !validator.isURL(req.body.photoUrl)) {
     return { valid: false, message: "Invalid URL for photoUrl" };
   }
 
   // Validate skills length
   if (req.body.skills && req.body.skills.length > 30) {
     return { valid: false, message: "Skills should be less than 30" };
   }
 
   // Ensure only allowed fields are being edited
   const isEditAllowed = Object.keys(req.body).every((k) => allowedEdits.includes(k));
   if (!isEditAllowed) {
     return { valid: false, message: "Invalid fields in edit request" };
   }
 
   return { valid: true };
 };
 
module.exports = {validatetheSignUpData,validatetheProfileData };