const express=require('express');
const router=express.Router();
const adminjwtmiddleware=require('../../Middlewares/adminjwtmiddleware')

router.get('/adminData',adminjwtmiddleware,require('../../controllers/admin/admindashboardcontroller').getAdminData);

module.exports=router