var express = require('express');
var router = express.Router();
const { index,viewHandledChecker,handledChecker,actionDelete} = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', index);
// router.get('/create', viewHandledChecker);S
// router.post('/create', handledChecker);
// router.get('/edit/:id', viewEdit);
// router.put('/edit/:id', actionEdit);
// router.delete('/delete/:id', actionDelete);
// router.put('/status/:id', actionStatus);

module.exports = router;
