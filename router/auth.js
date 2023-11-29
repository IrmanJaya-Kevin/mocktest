const express = require('express');
const router = express.Router();
const controller=require('../app/controller')

const {auth}=require('../utils/jwt')




router.post('/api/auth/login', controller.auth.login)
router.post('/api/auth/register', controller.auth.register)
router.get('/api/auth/whoami', auth,controller.auth.whoami)




module.exports = router;