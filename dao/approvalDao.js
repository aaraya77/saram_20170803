// Author: sanghee park <novles@naver.com>
// Create Date: 2014.12.18
// 사용자 Service
var debug = require('debug')('approvalDao');
var util = require('util');
var db = require('../lib/dbmanager.js');

var ApprovalDao = function () {
};
ApprovalDao.prototype.selectApprovalList =  function (doc_num) {
    var queryStr = db.getQuery('approval', 'selectApprovalList');
    return db.queryV2(queryStr, [doc_num]);
};
ApprovalDao.prototype.selectApprovalListWhere =  function (startDate, endDate) {
    var queryStr = db.getQuery('approval', 'selectApprovalListWhere');
    
    return db.queryV2(queryStr, [startDate,endDate,startDate,endDate]);
};
ApprovalDao.prototype.selectApprovalByManager =  function (manager_id, startDate, endDate) {
    var queryStr = db.getQuery('approval', 'selectApprovalByManager');
    
    return db.queryV2(queryStr, [manager_id,startDate,endDate,startDate,endDate]);
};
ApprovalDao.prototype.insertApproval =  function (data) {
    var queryStr = db.getQuery('approval', 'insertApproval');
    return db.queryV2(queryStr, [data.doc_num,data.submit_id,data.manager_id
    ,data.submit_comment,data.start_date,data.end_date
    ,data.office_code,data.start_time,data.end_time,data.day_count]);
};
ApprovalDao.prototype.updateApprovalConfirm =  function (connection, data) {
    var queryStr = db.getQuery('approval', 'updateApprovalConfirm');
    return db.queryTransaction(
        connection,
        queryStr,
        data,
        [
            "decide_comment", "state", "black_mark", "doc_num"
        ]
    ); 
};

ApprovalDao.prototype.selectApprovalListById =  function (data) {
    var queryStr = db.getQuery('approval', 'selectApprovalListById');
    return db.queryV2(queryStr, [data.id, data.year]);
};

ApprovalDao.prototype.getApprovalMailData =  function (doc_num) {
    var queryStr = db.getQuery('approval', 'getApprovalMailData');
    return db.queryV2(queryStr, [doc_num]);
};

ApprovalDao.prototype.getApprovalMailingList =  function (dept_code) {
    var queryStr = db.getQuery('approval', 'getApprovalMailingList');
    return db.queryV2(queryStr, [dept_code]);
};

ApprovalDao.prototype.selectApprovalIndex =  function (yearmonth) {
    var queryStr = db.getQuery('approval_index', 'selectMaxIndexApproval');
    return db.queryV2(queryStr, [yearmonth]);
};
ApprovalDao.prototype.insertApprovalIndex =  function (data) {
    var queryStr = db.getQuery('approval_index', 'insertApprovalIndex');
    return db.queryV2(queryStr, [data.yearmonth]);
};
ApprovalDao.prototype.updateMaxIndex =  function (data) {
    var queryStr = db.getQuery('approval_index', 'updateMaxIndex');
    return db.queryV2(queryStr, [data.yearmonth]);
};



module.exports = new ApprovalDao();