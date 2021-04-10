const Router=require("express").Router();
const jwt=require("jsonwebtoken");
const usermodel=require("../models/userModel");

Router.get("/",async(req,res)=>
{
    const token=req.query.token;
    if(!token)
    {
        return res.status(404).json({"credentials":"invalid"});
    }
    try {
        var decoded = await jwt.verify(token, process.env.JWTSECRET);
        if(decoded)
        {
            const result=await usermodel.findById(decoded.userid);
            if(!result)
            {
                return res.status(404).json({"credentials":"invalid"})
            }
            return res.status(200).json({username:result.username});
        }
    } catch (error) {
        return res.status(404).json({"credentials":"invalid"});
    }

})

module.exports=Router;
