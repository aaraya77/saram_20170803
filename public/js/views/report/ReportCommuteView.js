define([
  'jquery',
  'underscore',
  'backbone',
  'util',
  'schemas',
  'grid',
  'dialog',
  'datatables',
  'core/BaseView',
  'text!templates/default/head.html',
  'text!templates/default/content.html',
  'text!templates/default/right.html',
  'text!templates/default/button.html',
  'text!templates/layout/default.html',
  'jqFileDownload',
  'models/sm/SessionModel',
  'models/report/ReportModel',
  'views/component/ProgressbarView',
  'text!templates/report/searchFormTemplate.html'
], function($,
		_,
		Backbone, 
		Util, 
		Schemas,
		Grid,
		Dialog,
		Datatables,
		BaseView,
		HeadHTML, ContentHTML, RightBoxHTML, ButtonHTML, LayoutHTML,
		JqFileDownload,
		SessionModel,
		ReportModel,
		ProgressbarView,
		searchFormTemplate){
	
//	// 검색 조건 년도 
	function _getFormYears() {
		var startYear = 2000;
		var endYear= new Date().getFullYear() + 1;
		var years = [];
		
		for (; startYear <= endYear; endYear--) {
			years.push(endYear);
		}
		return  years;
	}
	
	var ReportCommuteView = BaseView.extend({
        el:$(".main-container"),
    	events: {
    		'click #btnCreateExcel' : 'onClickCreateExcelBtn'
    	},
    	render:function(){
    	    var _headSchema=Schemas.getSchema('headTemp');
    	    var _headTemp=_.template(HeadHTML);
    	    var _layOut=$(LayoutHTML);
    	    var _head=$(_headTemp(_headSchema.getDefault({title:"일반 관리", subTitle:"레포트"})));
    	    
    	    _head.addClass("no-margin");
    	    _head.addClass("relative-layout");

    	    
    	    var searchForm = _.template( searchFormTemplate )( {formYears: _getFormYears(), nowYear: new Date().getFullYear() });
    	    this.progressbar = new ProgressbarView();
    	    
    	    _layOut.append(_head);
    	    _layOut.append(searchForm);
    	    _layOut.append(this.progressbar.render());
    	      	    
    	    $(this.el).html(_layOut);

            return this;
     	},
     	onClickCreateExcelBtn: function() {
     		
//    		var model = new ReportModel();
//    		model.commuteYearReportUrl().fetch(this.getSearchForm(), {
//        		success: function(model, response) {
//        			alert(1);
//             	}, error : function(model, res){
//             		alert(2);
//             	}
//    		});  
     		
//     		$.ajax({
//     		    type: "GET",
//     		    url: "/report/commuteYearReport",
//     		    data: this.getSearchForm(),
//     		    cache: false,
//     		    success: function(response)
//     		    {
//     		        alert('got response');
//     		        
//     		    },
//     		    error: function (XMLHttpRequest, textStatus, errorThrown) 
//     		    {
//     		        
//     		    }
//     		});     		
//     		
     		 
     		$.fileDownload('/report/commuteYearReport', {
     		    successCallback: function (url) {
     		 
     		    	alert(1);
     		    },
     		    failCallback: function (html, url) {
     		    	alert(2);
     		    }
     		});     		
     		
     		
     	},
     	getSearchForm: function() {	// 검색 조건  
     		return {year: this.$el.find("#selectYear").val()};
     	}
    });
    
    return ReportCommuteView;
});