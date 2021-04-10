const Router=require("express").Router();
const UserModel=require("../models/userModel");

const bcrypt = require('bcrypt');
const saltRounds = 10;

Router.post("/",async(req, res)=>{
    const email=req.body.email;
    const password=req.body.password;

    if(!email || !password)
    {
        return res.status(200).json({"credentials":"invalid"});
    }
    
    try {
        const foundUser=await UserModel.findOne({email:email});

        if(foundUser)
        {
            const validPassword = await bcrypt.compare(password, foundUser.password);
            if(validPassword){
                return res.status(200).json({"credentials":"valid"})
            }
            else{
                return res.status(200).json({"credentials":"invalid"});
            }
        }
        {
            return res.status(200).json({"credentials":"unknown"});
        }

    } catch (error) {
        console.log(error);
    }
    
})

module.exports=Router;