const express=require('express');
const router=express.Router();
const studentjwtmiddleware=require('../../Middlewares/studentjwtmiddleware')

router.get('/studentData',studentjwtmiddleware,require('../../controllers/students/studentdashboardcontroller').getStudentData);

module.exports=router