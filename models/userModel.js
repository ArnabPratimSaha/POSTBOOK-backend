const mongoose=require("mongoose");
const userSchema=require("../schemas/userSchema")

const UserModel=mongoose.model("User", userSchema);

module.exports=UserModel;
