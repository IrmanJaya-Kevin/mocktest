const express = require('express');
const router = express.Router();
const controller=require('../app/controller')





router.delete('/api/lists/:listId', controller.lists.destroy)
router.post('/api/lists', controller.lists.create)


module.exports = router;