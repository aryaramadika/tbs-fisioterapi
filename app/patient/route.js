var express = require('express');
var router = express.Router();
const {landingPage, detaiTherapistPage, book, treatmentDetail,history,historyDetail,dashboard,profile,editProfile } = require('./controller')

const { isLoginPatient } = require('../middleware/auth')
const multer = require('multer')
const os = require('os')

// router.use(isLoginAdmin)
router.get('/landingpage', landingPage);
router.get('/:id/detail/', detaiTherapistPage);
router.get('/:id/treatmentdetail/', treatmentDetail);
router.post('/book',isLoginPatient, book);
router.get('/history',isLoginPatient, history);
router.get('/history/:id/detail', isLoginPatient, historyDetail);
router.get('/dashboard', isLoginPatient, dashboard);
router.get('/profile', isLoginPatient, profile);
router.put('/profile',
  isLoginPatient,
  multer({ dest: os.tmpdir() }).single('image'),
  editProfile
);








module.exports = router;
