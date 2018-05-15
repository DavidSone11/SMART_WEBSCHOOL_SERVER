var express = require('express');
var router = express.Router();
var user = require("./users.route");
var auth = require("./auths.route");
var userPlan = require("./userPlans.route");
var multer  = require("multer");
var upload = multer({ dest: './uploads' })




router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/dologout', auth.doLogout);

//[require('../middlewares/authenticate.admin.validate').authenticateAdmin]

router.get('/api/v1/users/getAllUsers', user.getAllUsers);
router.post('/api/v1/users/createUser', user.saveUser);
router.get('/api/v1/users/findByUsername', user.findByUserName);
router.put('/api/v1/users/updateUser', user.updateUser);
router.delete('/api/v1/users/deleteUser', user.deleteUser);
router.post('/api/v1/users/bulkCreate', user.createBulkUser);



// Route for UserPlan
router.get('/api/v1/userPlan/getPlans', userPlan.getPlanAllPlans);
router.post('/api/v1/userPlan/createUserPlan', userPlan.savePlan);
// router.get('/api/v1/userPlan/findByUsername', user.findByUserName);
// router.put('/api/v1/userPlan/updateUser', user.updateUser);
// router.delete('/api/v1/userPlan/deleteUser', user.deleteUser);
// router.post('/api/v1/userPlan/bulkCreate', user.createBulkUser);




// Route for UserPlan
router.get('/api/v1/userUpload/getAllUserUpload', require("./userUpload.route").getllUpload);
router.post('/api/v1/userUpload/createUserUpload',upload.single('file'), require("./userUpload.route").saveUpload);
// router.get('/api/v1/userPlan/findByUsername', user.findByUserName);
// router.put('/api/v1/userPlan/updateUser', user.updateUser);
// router.delete('/api/v1/userPlan/deleteUser', user.deleteUser);
// router.post('/api/v1/userPlan/bulkCreate', user.createBulkUser);


module.exports = router;
