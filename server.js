const express=require("express");
const cors=require("cors");

require("dotenv").config();

const LogIn= require("./routes/login");
const SignUp=require("./routes/signup");
const Home=require("./routes/home");

const app=express();
app.use(cors());
app.use(express.json());

/////////monogDB/////////

const mongoose=require("mongoose");
mongoose.connect(process.env.MONGODBSERVER, {useNewUrlParser: true, useUnifiedTopology: true});

/////////monogDB/////////

app.use("/login",LogIn);
app.use("/signup",SignUp);
app.use("/home",Home);

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>
{
    console.log(`server started on port ${PORT}`);
})
