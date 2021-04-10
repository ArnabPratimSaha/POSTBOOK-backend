const Router=require("express").Router();
var jwt=require("jsonwebtoken");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserModel = require("../models/userModel");

Router.get("/",async(req, res)=>{
    return res.status(200).json({"get":"true"});
})


Router.post("/",async(req, res)=>{

    const username=req.body.username;
    const email=req.body.email;
    let password=req.body.password;

    if(!username || !email || !password)
    {
        return res.status(200).json({"credentials":"invalid"});
    }

    try {
        const hash=await bcrypt.hash(password, saltRounds);
        password=hash;
    } catch (error) {
        console.log(error);
    }

    const newUser=new UserModel({
        username:username,
        email:email,
        password:password
    })

    try {
        const response=await UserModel.findOne({email:email})
        if(response)
        {
            return res.status(200).json({"credentials":"invalid"});
        }

    } catch (error) {
        console.log(error);
    }
    newUser.save();
    const JWT=jwt.sign({ userid: newUser._id }, process.env.JWTSECRET);
    res.status(200).json({"credentials":"valid","token":JWT})

})

module.exports=Router;