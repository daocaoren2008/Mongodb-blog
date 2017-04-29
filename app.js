var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var index = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
var app = express();

//静态文件根目录,可以设置多个
app.use(express.static(path.resolve('node_modules')));
app.use(express.static(path.resolve('public')));
app.use(bodyParser.urlencoded({extended: true}));
//会在req.session
app.use(session({
    resave: true,//每次客户端访问服务器的时候不管有没有修改session都要重新保存session
    saveUninitialized: true,//保存未操作过的session
    secret: 'zfpx' //服务器往客户端发送的时候会对cookie进行加密，以后每次客户端再访问服务器的时候，服务器会校验加密,如果校验通过，那么就使用数据，如果较验不通过，则认为是被篡改过的数据
}));
//依赖session,放到session下面
app.use(flash());

//设置模板引擎
app.set('view engine', 'html');
//设置模板的存放目录
app.set('views', path.resolve('views'));
//设置模板渲染方法
app.engine('html', require('ejs').__express);
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});
//1参数 是请求过来的路径的前缀
app.use('/', index);
app.use('/user', user);
app.use('/article', article);
app.listen(8081, function () {
    console.log(8081)
});