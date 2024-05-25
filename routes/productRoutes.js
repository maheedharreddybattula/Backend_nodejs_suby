const express = require ('express');
const productController = require('../controlers/productControler');
const router = express.Router()

router.post('/add-product/:firmId',productController.addProduct)
router.get('/:firmId/products',productController.getProductByFirm)

//image route
router.get('/uploads/:imageName',(req,res)=>{

    const imageName = req.params.imageName;
    res.headersSent('content-type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads', imageName))

})

router.delete(':/productId',productController.deleteProductById)
module.exports=router
