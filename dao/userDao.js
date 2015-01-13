// Author: sanghee park <novles@naver.com>
// Create Date: 2014.12.18
// 사용자 Service
var debug = require('debug')('userDao');
var util = require('util');
var db = require('../lib/dbmanager.js');

var UserDao = function () {
};

UserDao.prototype.selectIdByUser =  function (id) {
    var queryStr = db.getQuery('user', 'selectIdByUser');
    return db.queryV2(queryStr, [id]);
};
UserDao.prototype.selectUserList =  function () {
    var queryStr = db.getQuery('user', 'selectUserList');
    return db.queryV2(queryStr);
};
UserDao.prototype.initPassword =  function (id, password) {
    var queryStr = db.getQuery('user', 'initPassword');
    return db.queryV2(queryStr, [password, id]);
};
UserDao.prototype.deleteUser = function(id){
    var queryStr = util.format(db.getQuery('user', 'deleteUser'));
    return db.queryV2(queryStr,[id]);
};
UserDao.prototype.insertUser = function(user){
    var queryStr = db.getQuery('user', 'insertUser');
    return db.queryV2(queryStr, [user.id, user.name, user.dept_code, user.name_commute, user.join_company]);
};
module.exports = new UserDao();