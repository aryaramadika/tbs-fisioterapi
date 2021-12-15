var express = require('express');
var router = express.Router();
const { viewSignin,actionSignin, actionLogout, viewSignup, actionSignup } = require('./controller')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
router.get('/', viewSignin);
router.post('/', actionSignin);
router.get('/sign_up', viewSignup);
router.post('/sign_up', actionSignup);
router.get('/logout', actionLogout);

module.exports = router;
