const router=require('express').Router();
const user=require('../controllers/user.controller');
const auth=require('../middlewares/auth');

router.post('/login',user.login);
router.get('/accountDetails',auth,user.accountDetails);
router.get('/transactions',auth,user.transactions);
//router.post('/createTransaction',auth,user.createTransaction);

module.exports=router;