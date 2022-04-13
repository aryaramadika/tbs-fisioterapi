var express = require('express');
var router = express.Router();
const {index,viewCreate,actionCreate, viewEdit ,actionEdit,actionDelete, patientHandled} = require('./controller')
/* GET home page. */
const multer = require('multer')
const os = require('os')
const {isLoginAdmin} = require('../middleware/auth')
// get home page

router.use(isLoginAdmin)
router.get('/',index)
router.get('/create',viewCreate)
router.post('/create', multer({ dest: os.tmpdir() }).single('image'), actionCreate);router.get('/edit/:id', viewEdit)
router.put('/edit/:id', actionEdit)
router.delete('/delete/:id', actionDelete)
router.get('/',patientHandled)
module.exports = router;

