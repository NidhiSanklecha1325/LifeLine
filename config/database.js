const mongoose = require('mongoose')

const connectDB = async() =>{
    try{
        await mongoose.connect("mongodb+srv://sanklechanidhi02:capstone4@cluster0.sbwuwhw.mongodb.net/lifeline")
        console.error("Success")
    }catch(error){
        console.error("Failure")
    }
}
module.exports = connectDB;