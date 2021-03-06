var express = require('express');
var router = express.Router();
const {landingPage, detaiTherapistPage, book, treatmentDetail,paymentMethod,history,historyDetail,
  dashboard,profile,editProfile, 
  detailPriceTreatmentPage, ques, reservationPage,recommendation,emr,recommendationHistory,checkupHistory,patientRecommendation} = require('./controller')

const { isLoginPatient } = require('../middleware/auth')
const multer = require('multer')
const os = require('os')

// router.use(isLoginAdmin)
router.get('/landingpage', landingPage);
router.get('/:id/detail/', detaiTherapistPage);
router.get('/pricedetail', detailPriceTreatmentPage);
router.get('/recommendation', recommendation);
router.get('/:id/treatmentdetail/', treatmentDetail);
router.get('/:id/emr/', emr);
router.get('/paymentMethod/', paymentMethod);
router.post('/book',isLoginPatient, book);
router.post('/ques',isLoginPatient, ques);
router.get('/history',isLoginPatient, history);
router.get('/history/:id/detail', isLoginPatient, historyDetail);
router.get('/dashboard', isLoginPatient, dashboard);
router.get('/recommendHistory', isLoginPatient, recommendationHistory);

router.get('/reservationPage',isLoginPatient, reservationPage);
router.get('/profile', isLoginPatient, profile);
router.put('/profile',
  isLoginPatient,
  multer({ dest: os.tmpdir() }).single('image'),
  editProfile
);
router.get('/checkupHistory',checkupHistory);
router.get('/patientRecommendation', patientRecommendation);








module.exports = router;
