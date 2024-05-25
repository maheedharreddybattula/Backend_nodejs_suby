const mongoose = require("mongoose")

const firmSchema =new mongoose.Schema({
    firmname :{
        type : String,
        required : true,
        unique : true
    },
    area:{
        type : String,
        required : true
    },
    category:
        [
            {
                type : String,
                enum : ['veg','non-veg']
            }
        ]
    ,
    region :
        [
            {
                type : String,
                enum :['south-indian','north-indian','chinese','bakery']
            }
        ]
    ,

    offer:{
        type :String
    },
    image :{
        type : String
    },
    vendor :[{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'vendor' 
    }],
    products :[{
        type : mongoose.Schema.Types.ObjectId ,
        ref :'Product'
    }]
})
const Firm = mongoose.model('firm',firmSchema)
module.exports=Firm