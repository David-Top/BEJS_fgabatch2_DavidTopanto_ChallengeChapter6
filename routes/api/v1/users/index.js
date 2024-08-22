const express = require('express');
const router = express.Router();
const USERS_CONTROLLERS = require('../../../../controllers/user.controller');
// const PIC = require('../../../../config/storage/cloud/index');

//Endpoint users
//GET all users data
router.get('/', USERS_CONTROLLERS.index);

//POST user data
router.post('/create', USERS_CONTROLLERS.createUser);

//GET user data by id
router.get('/:id', USERS_CONTROLLERS.userById);

//PUT user profile pic
// router.put('/:id/upload-profile-pic', PIC.profile.single('file'), USERS_CONTROLLERS.uploadProfilePic);

module.exports = router;