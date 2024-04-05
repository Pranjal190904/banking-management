const router=require('express').Router();
const user=require('../controllers/user.controller');
const auth=require('../middlewares/auth');

router.post('/login',user.login);
router.get('/accountDetails',auth,user.accountDetails);

module.exports=router;