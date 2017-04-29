var express = require('express');
//返回一路由中间件实例
var router = express.Router();
//
router.get('/',function(req,res){
    res.render('index',{title:'首页',user:req.session.user});
});
module.exports = router;