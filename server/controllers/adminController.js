const { model } = require("mongoose");
const appointmentModel = require("../models/appointmentModel");
const stockModel = require("../models/stockModel");
const userModel = require("../models/userModel")

const getDonationRequestListController = async(req,res) =>{
    console.log("donation requests")
    try {
        const request = await appointmentModel.find({
            requestType : "in", status : "pending"
        }).populate("userId")
        let currentResult = [];
        let pendingResult = []
        request.map((r)=>{
            let appointmentDate = new Date(r.appointmentDate)
            
            if(appointmentDate < new Date()){
                currentResult.push(r)
            }else{
                pendingResult.push(r)
            }
           
        })
        console.log(request)
        return res.status(200).send({
            success: true,
            currentResult,
            pendingResult
        })
    } catch (error) {
        console.log(error)
    }
    
}
const getBloodRequestListController = async(req,res) =>{
    
    try {
        const request = await appointmentModel.find({
            requestType : "out", status : "pending"
        })
        /* let currentResult = [];
        let pendingResult = []
        request.map((r)=>{
            let appointmentDate = new Date(r.appointmentDate)
            
            if(appointmentDate < new Date()){
                currentResult.push(r)
            }else{
                pendingResult.push(r)
            }
           
        }) */
        console.log(request)
        return res.status(200).send({
            success: true,
            request
        })
    } catch (error) {
        console.log(error)
    }
    
}

const getAppointmentListController = async(req,res) =>{
    
    try {
        const request = await appointmentModel.find({
             status : "approved"
        }).populate("userId").sort({"createdAt": -1})
        const donors = await userModel.find({"role": "donor"})
        const consumers = await userModel.find({"role": "receiver"})
        
        console.log(donors)
        return res.status(200).send({
            success: true,
            request, donors,consumers
        })
    } catch (error) {
        console.log(error)
    }
    
}

const addToStocksController = async(req,res) =>{
    console.log(req.body)
    try{
        const result = await stockModel.findOneAndUpdate({bloodGroup: req.body.bloodGroup},{ $inc : {unit: req.body.unit}})
        if(result){
            await appointmentModel.findOneAndUpdate({_id:req.body.id},{status: "approved"})
            return res.status(201).send({   
                success: true,
                message: "Blood group "+ result.bloodGroup+ " is added to inventory",
               
              });
        }
    }catch(error){
        console.log(error)
    }
}
const rejectRequestController = async(req,res) =>{
try {
    const result = await appointmentModel.findOneAndUpdate({_id:req.body.id},{status: "rejected"})

            return res.status(201).send({   
                success: true,
                message: "Donation of "+ result.bloodGroup+ " is rejected.",
               
              });
} catch (error) {
    console.log(error)
}
}
const deleteFromStocksController = async(req,res) =>{
    console.log(req.body)
    try{
        const result = await stockModel.findOneAndUpdate({bloodGroup: req.body.bloodGroup},{ $inc : {unit: -req.body.unit}})
        if(result){
           const a = await appointmentModel.findOneAndUpdate({_id:req.body.id},{status: "approved" , appointmentDate: new Date().toDateString()})
           console.log(a)
            return res.status(201).send({   
                success: true,
                message: "Blood Request Approved",
                 
              });
        }
    }catch(error){
        console.log(error)
    }
}
const getInventoryContoller = async(req,res) =>{

    try {
        const result = await stockModel.find()
        
        
        return res.status(201).send({   
            success: true,
            result
           
          });
    } catch (error) {
        console.log(error)
    }
}

const getInventoryForHomeContoller = async(req,res) =>{

    try {
        const result = await stockModel.find()

        let currentResult = []
        result.map((stock) =>{
            let bloodPercent = (100 * parseInt(stock.unit)) / 50
            currentResult.push({stock, "bloodPercent" : bloodPercent})
        })
        console.log(currentResult)
        return res.status(201).send({   
            success: true,
            currentResult
           
          });
    } catch (error) {
        
    }
}

const donationController = async(req,res)=>{
    console.log("donation")
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        model: "payment",
        success_url:"",
        cancel_url:""
    })
        
}
module.exports = {getDonationRequestListController,getAppointmentListController,addToStocksController,getInventoryContoller,
    rejectRequestController,getBloodRequestListController,deleteFromStocksController,donationController,getInventoryForHomeContoller}