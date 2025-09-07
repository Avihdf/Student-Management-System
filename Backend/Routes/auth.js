const express=require('express');
const router=express.Router();
const {login}=require('../controllers/logincontroller');
const {register}=require('../controllers/registercontroller');
const {googleAuth}=require('../controllers/googleauthcontroller');


// Route for user registration
router.post('/register',register);

// Route for user login
router.post('/login',login);

// Route for Google OAuth login
router.post('/google-auth',googleAuth);


// Route for logout (for both admin and student)
router.get('/adminlogout',require('../controllers/logoutcontroller').adminLogout);
router.get('/studentlogout',require('../controllers/logoutcontroller').studentLogout);


module.exports=router;