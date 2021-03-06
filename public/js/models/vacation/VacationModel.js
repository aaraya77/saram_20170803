define([
  'jquery',
  'underscore',
  'backbone'
], function($, _,Backbone){
	
    var VacationModel = Backbone.Model.extend({
        urlRoot: '/vacation',
        idAttribute:"_id",
        initialize: function () {
        },
        defaults:{
        	year: "",		// 휴가 사용 년도 
        	id: "",			// 사번
        	dept_name: "",	// 부서
        	name : "",		// 이름
        	total_day: 0,	// 연차
        	used_holiday: 0, 		// 사용 일수  (out_office_tbl - year + id 조홥 조회   )
        	holiday: 0,			// 휴가 잔여 일수 (total_day - used_holiday)
          memo: '',
          leave_company: '' // 퇴사자의 경우 퇴사일
        },initHoliday: function() {
        	var holiday = this.get("total_day") - this.get("used_holiday");
        	this.set({holiday: holiday}); 
        }
    });
    
    return VacationModel;
});