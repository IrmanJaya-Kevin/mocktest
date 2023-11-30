const express = require('express');
const router = express.Router();
const controller=require('../app/controller')




router.get('/api/users', controller.users.get)
router.get('/api/users/:userId', controller.users.getById)
router.delete('/api/users/:userId', controller.users.destroy)

// router.get('/dashboard',(req,res)=>{
//     console.log(req.body)
// })


module.exports = router;