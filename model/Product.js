//Product Model in sql like table schema
const mongoose =require('mongoose');


//product schemea
const productSchema =new mongoose.Schema({
     productName :{
        type : String,
        required : true,
     },
     price :{
        type : String,
        required : true,
     },
     category :[
        {
            type : String,
            enum : ['veg','non-veg']
       
     }
    ],

    image:{
        type:String
    },

    bestSeller:{
        type:String
    },
    description:{
        type : String
    },

    firm :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Firm'
    }]



})

const Product = mongoose.model('Product',productSchema)
module.exports=Product


