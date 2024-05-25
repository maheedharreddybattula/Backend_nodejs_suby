const express = require('express')
const firmControler =require('../controlers/firmControler')
const verifyToken = require('../middlewares/verifyToken')
const router =express.Router()

router.post('/add-firm',verifyToken,firmControler.addfirm)

//image route
router.get('/uploads/:imageName',(req,res)=>{

    const imageName = req.params.imageName;
    res.headersSent('content-type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads', imageName))

})

router.delete(':/firmId',firmControler.deleteFirmById)
module.exports=router;
