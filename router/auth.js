const express = require('express');
const router = express.Router();
const controller=require('../app/controller')

const {auth}=require('../utils/jwt')




router.post('/api/auth/login', controller.auth.login)
router.post('/api/auth/register', controller.auth.register)
router.get('/api/auth/whoami', auth,controller.auth.whoami)

router.get('/register',(req,res)=>{
    res.render('register.ejs')
})
router.post('/register', controller.auth.registerPageForm)
router.get('/login',(req,res)=>{
    res.render('login.ejs')
})
router.post('/login', controller.auth.loginPageForm,(req,res)=>{
    // console.log(req.data)
    // console.log(req.userListData)
    res.render('dashboard.ejs',{data:req.data,list:req.userListData})

})

module.exports = router;