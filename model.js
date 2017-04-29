var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;//mongoose提供的数据类型
//链接数据库
mongoose.connect('mongodb://127.0.0.1/201614blog');
//定义骨架模型
var UserSchema = new mongoose.Schema({
    username: {type: String, isRequired: true},
    password: {type: Number, isRequired: true},
    email: String,
    avatar:String
});

//
var ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    createAt:{type:Date,default:Date.now},
    //类型是对象id类型
    username: {type: ObjectId, ref: 'User'}//ref表示引用的文档
});
//定义导出Model
exports.User = mongoose.model('User', UserSchema);
exports.User = mongoose.model('Article', ArticleSchema);
