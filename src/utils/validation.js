const validator = require("validator");
const bcrypt = require("bcrypt");

const signupValidation = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) 
    throw new Error("Please Enter Valid Name!!!");

  else if (
    firstName.length < 3 ||
    firstName.length > 50 ||
    lastName.length < 3 ||
    lastName.length > 50
  )
    throw new Error("Name length limit : " + 3 + " to " + 50);

  else if (!validator.isEmail(emailId))
    throw new Error("Invalid Email Address!!!");

  else if (!validator.isStrongPassword(password))
    throw new Error("Please Enter Strong Password!!!");

};

const validateEditProfile = (req) => {
  const allowedFields = ["firstName", "lastName", "about", "photoUrl", "skills", "age", "gender"];

  if(req.body.skills.length > 20)
    throw new Error("skills should not more than 20!!");

  const isEditAllowed = Object.keys(req.body).every((field) => allowedFields.includes(field));

  return isEditAllowed;
}

const validatePasswordUpdate = async (req) => {
  
    const passwordHash = req.user.password;
  
    const userDBPassword = await bcrypt.compare(req.body.oldPassword, passwordHash);
  
    return userDBPassword;
} 

module.exports = {
    signupValidation,
    validateEditProfile,
    validatePasswordUpdate,
}