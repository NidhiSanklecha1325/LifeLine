const { getDB } = require("../config/database");
const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const registerController = async (req,res) =>{
   try{
    /* const db = getDB();
    const {user} = args; */
    console.log(req.body)
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message: "User exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password,salt)
        req.body.password = hashPassword
        /* console.log("employee", user);
        const result = await db.collection("users").insertOne(user); */
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({   
            success: true,
            message: "User Registerd Successfully",
            user,
          });
   }catch(error){
    console.log(error)
    res.status(500).send({
        success: false
    })
   }
};

//login call back
const loginController = async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Invalid Credentials",
        });
      }
      //check role
      if (user.role !== req.body.role) {
        return res.status(500).send({
          success: false,
          message: "role dosent match",
        });
      }
      //compare password
      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!comparePassword) {
        return res.status(500).send({
          success: false,
          message: "Invalid Credentials",
        });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Login API",
        error,  
      });
    }
  };

module.exports = {registerController, loginController};