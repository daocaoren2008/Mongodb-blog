var express = require('express');
//返回一路由中间件实例
var router = express.Router();
//
router.get('/add',function(req,res){
    res.render('article/add',{title:'发表文章'});
});
router.get('/list',function(req,res){
    res.render('article/list',{title:'文章列表'});
});
module.exports = router;