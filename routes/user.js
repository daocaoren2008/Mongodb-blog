var express = require('express');//因为模块都是私有的，所以需要再次引用express才行，但是都是单例模式的，express都是同一个对象。
var multer = require('multer');//处理上传文件格式数据
//指定上传的目录
var upload = multer({dest:'public/uploads'});
var User = require('../model').User;
//返回一路由中间件实例
var router = express.Router();

router.get('/signup', function (req, res) {
    res.render('user/signup', {title: '用户注册'});
});
router.post('/signup',upload.single('avatar'), function (req, res) {
    // console.log(req.body);
    console.log(req.file);
    var user = req.body;
    user.vavatar='/uploads/'+req.file.filename;
    User.create(user, function (err, doc) {
        if (err) {
            req.flash('error', '注册失败');
            res.redirect('back');
        } else {
            req.flash('success', '恭喜注册成功');
            res.redirect('/user/signin');//注册成功跳转到登录页
        }
    });//保存数据
});
//用户登录路由
router.get('/signin', function (req, res) {
    res.render('user/signin', {title: '用户注册', error: req.flash('error').toString()});
// 如果连续掉两次flash的error则第二次为空，因为一次就取完了
});
router.post('/signin',function(req,res){
    var user = req.body;
    User.findOne(user,function(err,doc){
        if(err){
            req.flash('error','用户名或密码错误');
            res.redirect('back');
        }else{
            if(doc){
                //把当前用户写入会话对象中
                req.flash('success','用户登录成功');
                req.session.user = doc;
                res.redirect('/');
            }else{
                req.flash('error','用户名或密码错误');
                res.redirect('back');
            }

        }
    });
});
router.get('/signout', function (req, res) {
    res.redirect('/');//跳转到首页
});
module.exports = router;