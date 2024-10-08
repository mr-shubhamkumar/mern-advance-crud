const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/usersControllers");
const upload = require("../multerconfig/storegeconfig.js");

//routes
router.post( "/user/register", upload.single("user_profile"), controllers.userspost);
router.get("/user/details", controllers.userget);
router.get('/user/:id', controllers.singleUserGet )
router.put('/user/edit/:id',upload.single("user_profile"), controllers.useredit)
router.delete('/user/delete/:id',controllers.userdelete)
router.put('/user/status/:id',controllers.userstatus)
router.get('/userexport/',controllers.userExport)
module.exports = router;
