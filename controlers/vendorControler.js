const Vendor = require('../model/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const doTenv =require("dotenv");

doTenv.config()

const secreatkey =process.env.securekey


const vendorRegister = async(req,res)=>{
    const {username,email,password} =req.body
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("Email already registerd")
        }
        const hashedPassword =await bcrypt.hash(password,10)
        const newVendor =new Vendor ({
            username,
            email,
            password:hashedPassword
        })
        await newVendor.save()
        res.status(201).json({message:"vendor registered successfully"
        })
        
    }catch(error){
         
        res.status(500).json({error:"Internal server error"})
        console.log(error)

    }

}
const vendorLogin =async(req,res)=>{
    const {email,password}=req.body 
    try{
        const vendor =await Vendor.findOne({email})
        console.log(vendor);
        if (!vendor || !(await bcrypt.compare(password,vendor.password))){
             res.status(401).json({"message":"Invalid email and paswword"})

        }
        const token =jwt.sign({vendorid : vendor._id},secreatkey,{"expiresIn":"1h"})
        res.status(200).json({"message":"Login succefully",token})
        console.log(email)
        console.log(token)

    }catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server error"})

    }
}

const getAllVendor = async (req,res)=>{
    try {
        const vendors =await Vendor.find().populate('firm');
        res.json({vendors});

        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
        
    }

}

//individiual records fetching
const getVendorById= async(req,res)=>{
    const vendorId =req.params.apple
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm')
        if(!vendor){
            return res.status(400).json({error:"vendor not found"})
        }
        res.status(200).json({vendor})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}


module.exports={vendorRegister,vendorLogin,getAllVendor,getVendorById}