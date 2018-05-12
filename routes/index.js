var express = require('express');
var router = express.Router();
var user = require("./users");
var auth = require("./auth");





router.post('/login',auth.login);
router.get('/logout',auth.logout);

router.get('/api/v1/users/getAllUsers',user.getAllUsers);
router.post('/api/v1/users/createUser',user.saveUser);
router.get('/api/v1/users/findByUsername',user.findByUserName);
router.put('/api/v1/users/updateUser',user.updateUser);
router.delete('/api/v1/users/deleteUser',user.deleteUser);
router.post('/api/v1/users/bulkCreate',user.createBulkUser);


module.exports = router;
