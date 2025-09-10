const express=require('express');
const router=express.Router();
const adminjwtmiddleware=require('../../Middlewares/adminjwtmiddleware');
const registeredStudent=require('../../controllers/admin/registerusercontroller')


router.get('/allregisterstudent',adminjwtmiddleware,registeredStudent.getAllregisterStudents);
router.delete('/deleteregisterstudent/:id',adminjwtmiddleware,registeredStudent.deletestudent);
router.get('/searchregisterstudent',adminjwtmiddleware,registeredStudent.searchStudentByNameEmailNumber);
router.get('/ristrictuser/:id',adminjwtmiddleware,registeredStudent.restrictUser);


module.exports=router;