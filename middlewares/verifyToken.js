const vendor =require ('../model/Vendor')
const jwt = require ('jsonwebtoken')
const doTenv =require("dotenv");
const Vendor = require('../model/Vendor');

doTenv.config()

const secreatkey =process.env.securekey

const verifyToken  = async(req,res,next) =>{
    const token = req.headers.token
    if(!token){
        return res.status(401).json({error :"Token is required"})
    }
    try {
        const decoded = jwt.verify(token,secreatkey)
         console.log(decoded);
        const vendor = await Vendor.findById(decoded.vendorid)
        console.log(vendor);
        if(!vendor){
            res.status(404).json({error:"vendor not found"})
        }
        
        req.vendorId= vendor._id
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({error : "Invalid Token"})
        
    }

}
module.exports = verifyToken