var db = require('../lib/dbmanager.js');
var group = 'statistics';

var StatisticsDao = function () {
    
};

StatisticsDao.prototype.selectPageUrlCount =  function (url) {
    return db.query(group, "selectPageUrlCount", [url]);
};

StatisticsDao.prototype.updatePageUrlCount =  function (url, count) {
    return db.query(group, "updatePageUrlCount", [url, count, url, count]);
};

StatisticsDao.prototype.selectAbnormalDeptSummary =  function (from, to) {
    return db.query(group, "selectAbnormalDeptSummary", [from, to]);
};

StatisticsDao.prototype.selectAbnormalPersonSummary =  function (from, to) {
    return db.query(group, "selectAbnormalPersonSummary", [from, to]);
};

StatisticsDao.prototype.selectDeptPersonCount =  function (yearMonth) {
    return db.query(group, "selectDeptPersonCount", [yearMonth]);
};

StatisticsDao.prototype.selectDeptPersonCountType2 =  function (from, to) {
    return db.query(group, "selectDeptPersonCountType2", [from, to]);
};

StatisticsDao.prototype.selectDeptDetail =  function (from, to, dept, workType) {
    return db.query(group, "selectDeptDetail", [from, to, dept, workType]);
};

StatisticsDao.prototype.selectOverTimePersonal =  function (yearMonth, dept, workType) {
    return db.query(group, "selectOverTimePersonal", [yearMonth, dept, workType]);
};

StatisticsDao.prototype.selectOverTimeDept =  function (yearMonth, dept, workType) {
    return db.query(group, "selectOverTimeDept", [yearMonth, dept, workType]);
};

module.exports = new StatisticsDao();
