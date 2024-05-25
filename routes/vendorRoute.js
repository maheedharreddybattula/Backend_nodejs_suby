
const vendorControler = require('../controlers/vendorControler')
const express = require('express')
const router =express.Router()

router.post('/register',vendorControler.vendorRegister);
router.post('/login',vendorControler.vendorLogin);
router.get('/all-vendors',vendorControler.getAllVendor);
router.get('/single-record/:apple',vendorControler.getVendorById);


module.exports=router;

