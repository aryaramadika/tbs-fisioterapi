var express = require('express');
var router = express.Router();
const {index,viewCreate,actionCreate,actionDelete,viewEdit} = require('./controller')
/* GET home page. */
const {isLoginAdmin,} = require('../middleware/auth')
// get home page

router.use(isLoginAdmin)
router.get('/',index)
router.get('/create',viewCreate)
router.post('/create',actionCreate)
router.get('/edit/:id', viewEdit)
// router.put('/edit/:id', actionEdit)
router.delete('/delete/:id', actionDelete)

module.exports = router;
