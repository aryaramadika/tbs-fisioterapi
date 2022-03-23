var express = require('express');
var router = express.Router();
const { viewSignin,actionSignin, actionLogout, viewSignup, actionSignup, viewManageProfile, actionManageProfile } = require('./controller')

// const { isLoginAdmin } = require('../middleware/auth')
const {isLoginAdmin} = require('../middleware/auth')
// get home page

// router.use(isLoginAdmin)
// router.get('/',index)
router.get('/', viewSignin);
router.post('/', actionSignin);
router.get('/sign_up', viewSignup);
router.post('/sign_up', actionSignup);
router.get('/logout', actionLogout);
// router.get('/setup_profile', viewSetupProfile);
// router.post('/setup_profile', actionSetupProfile);
router.get('/manage_profile', viewManageProfile);
router.put('/manage_profile/:id', actionManageProfile);

module.exports = router;