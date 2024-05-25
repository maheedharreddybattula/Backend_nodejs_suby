
const express = require('express');
const doTenv =require("dotenv");
const mongoose =require('mongoose')
const app =express()
const vendorRoutes= require ('./routes/vendorRoute')
const bodyParser = require ('body-parser')
const firmRoutes=require('./routes/firmRoute')
const productRoute = require('./routes/productRoutes')
const path = require('path')
//const cors = require('cors')
const PORT =4000;


doTenv.config();
mongoose.connect(process.env.MONGO_URI)

.then(()=>console.log('mongodb conncetd susscessfully'))
.catch((err)=>console.log(err))
app.use(bodyParser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes )
app.use('/product',productRoute)
app.use('/uploads',express.static('uploads'));
app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})

app.use('/home',(request,response)=>{
    response.send("<h1>Welcome to suby resytarunts</h1>")
})