const Firm = require('../model/Firm');
const Vendor = require('../model/Vendor');
const multer = require('multer');
const path = require('path'); 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        //cb(null, file.fieldname + path.extname+ Date.now() + path.extname(file.originalname));
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addfirm = async (req, res) => {
    try {
        const { firmname, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const firm = new Firm({
            firmname,
            area,
            category,
            region,
            offer,
            vendor: vendor._id,
            image
        });

        const savedFirm=await firm.save();
        vendor.firm.push(savedFirm)
        await vendor.save()
        return res.status(200).json({ message: "Firm added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteFirmById = async(req,res)=>{
    const firmId = req.params.firmId
    try {
        const deleteFirm = await firm.findByIdAndDelete(firmId)
        if (!deleteFirm){
            return res.status(400).json({error:"No Firm found"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Internal server error"})
        
    }
}

module.exports = { addfirm: [upload.single('image'), addfirm] , deleteFirmById };
