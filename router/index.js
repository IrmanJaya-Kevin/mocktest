const express=require('express');
const router=express.Router();
const users =require('./users');
const auth =require('./auth');
const lists =require('./lists');

router.use(users);
router.use(auth);
router.use(lists);

module.exports=router;