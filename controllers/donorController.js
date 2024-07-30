const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const centerModel = require("../models/centerModel");

const changePasswordController = async (req,res) =>{
    try {
        const user = await userModel.findOne({ email: req.body.email });
       
        console.log(req.body)
        const comparePassword = await bcrypt.compare(
            req.body.currentPassword,
            user.password
          );
          if (!comparePassword) {
            return res.status(500).send({
              success: false,
              message: "Old Password doesn't match",
            });
          }
          
            const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.newPassword,salt)
        req.body.newPassword = hashPassword
        const result = await userModel.updateOne({email: req.body.email}, { $set:{password: req.body.newPassword}})
            if(!result){
                return res.status(500).send({
                    success: false,
                    message: "Password didn't update due to technical reasons.",
                  });
            }else{
                return res.status(200).send({
                    success: true,
                    message: "Password changed Successfully",
                    
                    user,
                  });
            }
        
          
    } catch (error) {
        console.log(error)
    res.status(500).send({
        success: false
    })
    }
}

const searchLocationController = async(req,res)=>{
    const key = req.query.key
    console.log(key)
    try {
        const searchResults = await centerModel.find({city : {$regex : "^"+key, $options: "i"}}).distinct("city")
       
        
        return res.status(200).send({
            success: true,
            results: searchResults
        })
    } catch (error) {
        console.log(error)
    }
}
const searchCenterController = async(req,res)=>{
    const key = req.query.key
    console.log(key)
    try {
        const searchResults = await centerModel.find({city : {$regex : "^"+key, $options: "i"}})
       console.log(searchResults)
        
        return res.status(200).send({
            success: true,
            results: searchResults
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {changePasswordController,searchLocationController,searchCenterController}