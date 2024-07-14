

const Product = require("../model/Product");
const multer = require ("multer");
const Firm = require("../model/Firm");
const path = require('path')



console.log(Firm)
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + path.extname+ Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

//ADD product
const addProduct = async (req,res)=>{

    try {
        const {productName,price,category,bestseller,description}= req.body;
        const image = req.file ? req.file.filename : undefined;
        const firmId = req.params.firmId
        console.log(firmId)
        const firm  = await Firm.findById(firmId)
        console.log(firm)
        if (!firm){
            return res.status(400).json({error:"No firm found"});

        }
        const product = new Product({
            productName,price,category,bestseller,description,image,firm : firm._id

        })
        const savedProduct = await product.save()
     firm.products.push(savedProduct)
        await firm.save();
         return res.status(200).json(savedProduct); 

        
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Internal server error"})
        
    }
}

const getProductByFirm = async (req,res)=>{
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId)
        if (!firm){
            return res.status(400).json({error:"No Firm found"})
        }
        const restaurantName = firm.firmname;
        console.log(restaurantName)
        const products = await Product.find({firm :firmId})
        res.status(200).json({restaurantName,products})
  
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Internal server error"})
        
    }
}

const deleteProductById= async(req,res)=>{
    try {
        const productId= req.params.productId
        const deleteProduct = await Product.findByIdAndDelete(productId);
        if(!deleteProduct){
            return res.status(400).json({error:"No Product found"})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Internal server error"})
    }

}
module.exports ={addProduct :[upload.single('image'),addProduct],getProductByFirm,deleteProductById};
