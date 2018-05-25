var express = require('express');
var router = express.Router();
var user = require("./users.route");
var auth = require("./auths.route");
var userPlan = require("./userPlans.route");
var multer  = require("multer");
var upload = multer({ dest: './uploads' })

var timecalOBJ = require('../library/timeCalculator.lib');
var timecalmomentOBJ = require('../library/timeCalculator.moment.lib');



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
router.get('/api/v1/userUpload/findByfilename', require("./userUpload.route").findByfilename);
router.post('/api/v1/userUpload/saveUpload',upload.single('file'), require("./userUpload.route").saveUpload);
// router.get('/api/v1/userPlan/findByUsername', user.findByUserName);
// router.put('/api/v1/userPlan/updateUser', user.updateUser);
// router.delete('/api/v1/userPlan/deleteUser', user.deleteUser);
// router.post('/api/v1/userPlan/bulkCreate', user.createBulkUser);





// Route for UserFile Upload

router.get('/api/v1/trainStationUpload/getTrainStationUpload', require("./trainStation.upload.route").getlltrainStationUpload);
router.post('/api/v1/trainStationUpload/saveTrainStationUpload',require("./trainStation.upload.route").savetrainStationUpload);
router.get('/api/v1/trainStationUpload/processTrainStationUpload/:fname',require("./trainStation.upload.route").processtrainStationUpload);


router.get('/api/v1/trainUpload/getTrainUpload', require("./train.upload.route").getTrainUpload);
router.post('/api/v1/trainUpload/saveTrainUpload',require("./train.upload.route").saveTrainUpload);
router.get('/api/v1/trainUpload/processTrainUpload/:fname',require("./train.upload.route").processTrainUpload);

// router.get('/api/v1/time',check);

// function check(req,res){
// //    res.json(timecalOBJ.addDateTimeObj({nday:1,stime:"23:45"},5,"-","mins"));

 
// var from = {nday:1,stime:"08:45"};
// var to = {nday:1,stime:"15:30"};
// console.log(timecalOBJ.diffBetweenDateTimeOBJ(from,to,"hours"));
//    return res.json("Welcome :");

// }

//console.log(timecalOBJ.convertDateTimeObjToNumber({nday:1,stime:"5:45"},"hour"));
//console.log(timecalOBJ.convertNumberToDateTimeObj(1748,"+"));
//console.log(timecalOBJ.convertMinsToHrsMins(1748));
//console.log(timecalOBJ.toHourMinutes(65,"m2"));
//console.log(timecalOBJ.minutesToHHMM(1748,false));

// console.log(timecalOBJ.addDateTimeObj({nday:1,stime:"23:45"},5,"-","mins"));


//console.log(timecalmomentOBJ.convertDateTimeObjToNumber({nday:1,stime:"5:30"}));

module.exports = router;
