/**
 * 근태 자료 수정 팝업
 */

define([ 
    'jquery',
    'underscore',
    'backbone',
    'util',
    'schemas',
    'grid',
    'dialog',
    'datatables',
    'cmoment',
    'resulttimefactory',
    'comboBox',
    'core/BaseView',
    'code',
	'i18n!nls/common',
	'lib/component/form',
    'models/sm/SessionModel',
    'models/cm/CommuteModel',
    'models/cm/ChangeHistoryModel',
    'collection/cm/CommuteCollection',
    'collection/cm/ChangeHistoryCollection',
], function(
$, _, Backbone, Util, Schemas, Grid, Dialog, Datatables, Moment, ResultTimeFactory, ComboBox,
BaseView, Code, i18nCommon, Form,
SessionModel,
CommuteModel, ChangeHistoryModel, CommuteCollection,  ChangeHistoryCollection
) {
	
	var CommuteUpdatePopupView = Backbone.View.extend({
		initialize : function(data) {
			this.selectData = data;
		},
		render : function(el) {
			var dfd= new $.Deferred();
			
			if (!_.isUndefined(el)) this.el=el;
			
			var _view=this;
			var overtimeCodes = Code.getCodes(Code.OVERTIME);
			var comboItem = [{key:" ", value:"초과근무 없음"}];
			var selectedCode = null;
			comboItem.push({key:"",value:""});
    	    for(var key in overtimeCodes){
    	    	comboItem.push({key:overtimeCodes[key].code, value:overtimeCodes[key].name});
    	    }
			var _form = new Form({
		        el:_view.el,
		        form:undefined,
		        group:[{
	                name:"destInfo",
	                label:i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.FORM.GROUP_DEST,
	                initOpen:true
	            },{
	                name:"modifyItem",
	                label:i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.FORM.GROUP_NEW,
	                initOpen:true
	            }],
		        
		        childs:[{
	                type:"input",
	                name:"date",
	                label:i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.FORM.DATE,
	                value:this.selectData.date,
	                group:"destInfo",
	                disabled:true
	        	}, {
	        		type:"input",
	                name:"department",
	                label:i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.FORM.DEPARTMENT,
	                value:this.selectData.department,
	                group:"destInfo",
	                disabled:true
	        	}, {
	        		type:"input",
	                name:"name",
	                label:i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.FORM.NAME,
	                value:this.selectData.name,
	                group:"destInfo",
	                disabled:true
	        	}, {
					type: "checkBox",
					name: "normal",
					checkLabel: '근태 정상처리',
					value: this.selectData.normal,
					group: "modifyItem",
					full: true
				}, {
	                type:"datetime",
	                name:"inTime",
	                label:i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.FORM.IN_TIME,
	                value:_.isNull(this.selectData.in_time) ? null : Moment(this.selectData.in_time).year(this.selectData.year).format("YYYY-MM-DD HH:mm"),
	                format:"YYYY-MM-DD HH:mm",
	                group:"modifyItem"
	        	}, {
	                type:"datetime",
	                name:"outTime",
	                label:i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.FORM.OUT_TIME,
	                value:_.isNull(this.selectData.out_time) ? null : Moment(this.selectData.out_time).year(this.selectData.year).format("YYYY-MM-DD HH:mm"),
	                format:"YYYY-MM-DD HH:mm",
	                group:"modifyItem"
	        	}, {
	                type:"combo",
	                name:"overtime",
	                label:i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.FORM.OVER_TIME,
	                value:this.selectData.overtime_code,
	                collection:comboItem,
	                group:"modifyItem"
		        }, {
		        	type:"text",
		        	name:"changememo",
		        	label:i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.FORM.CHANGE_MEMO,
		        	value:this.selectData.change_memo,
		        	group:"modifyItem"
		        }]
		    });
		    
		    _form.render().done(function(){
		        _view.form=_form;
		        dfd.resolve();
		    }).fail(function(){
		        dfd.reject();
		    });  
		    
            dfd.resolve();
            return dfd.promise();
		},
		updateCommute: function() {
			var dfd= new $.Deferred();
     		var data = this.getInsertData(); 
     		var that = this;
     		var changeData = { };
     		if (data === null) {
     			Dialog.show(i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.MSG.NOTING_CHANGEDS);
     			dfd.reject();
     		}else{
				var message = "";
				_.each(data.changeHistoryCollection.models, function(model){
					switch(model.get("change_column")){
						case "in_time":
							message = message + i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.MSG.IN_TIME_MSG;
							changeData.changeInTime = data.in_time;
							break;
						case "out_time":
							message = message + i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.MSG.OUT_TIME_MSG;
							changeData.changeOutTime = data.out_time;
							break;
						case "overtime_code":
							message = message + i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.MSG.OVER_TIME_MSG;
							changeData.changeOvertimeCode = data.overtime_code == null ? " " : data.overtime_code;
							break;
						case "normal":
							message = message + "근태 정상 처리";
							changeData.changeNormal = data.normal;
							break;
					}
					message = message + "[ " + model.get("change_before") + " > " +model.get("change_after") + "]\n";
				});
				
				message = message + i18nCommon.COMMUTE_RESULT_LIST.UPDATE_DIALOG.MSG.OVER_TIME_MSG_MEMO;
				
				data._id = this.selectData.id;	
	     		var commuteCollection = new CommuteCollection();
	     		
	     		Dialog.confirm({
					msg : message,
					action:function(){
						var actionDfd = new $.Deferred();
						commuteCollection.fetch({ 
			     			data: {
			     				id : data.id,
			     				startDate : Moment(data.date).add(-1, 'days').format("YYYY-MM-DD"),	
			     				endDate : Moment(data.date).add(1, 'days').format("YYYY-MM-DD"),
			     			},success : function(resultCollection){
			     				var idx;
			     				for(idx =0; idx < resultCollection.length; idx++){
			     					if(resultCollection.models[idx].get("date") == that.selectData.date){
			     						break;
			     					}
			     				}
			     				var resultTimeFactory = ResultTimeFactory.Builder();
			     				resultTimeFactory.modifyByCollection( // commute_result 수정
			     					resultCollection,
			     					changeData,
			     					data.changeHistoryCollection,
			     					idx
			     				).done(function(result){ // commute_result, changeHistroy 수정 성공!
				     				actionDfd.resolve(result);		
			     				}).fail(function(){
			     					actionDfd.reject();		
			     				});
			     			},error : function(){
			     				actionDfd.reject();	
			     			}
			     		});
	    	            return actionDfd.promise();
	                },
	                actionCallBack:function(res){//response schema
						dfd.resolve(res);	
	                },
	                errorCallBack:function(){
	                	dfd.reject();
	                },
	            });
     		}
     		
     		return dfd.promise();
			
		},
		getInsertData: function() {
			var data = this.form.getData();
     		var newData = {
     			date : this.selectData.date,
     			id : this.selectData.id,
     			in_time : data.inTime == "" ? null : data.inTime,
     			out_time : data.outTime == "" ? null : data.outTime,
				overtime_code : data.overtime == "" ? null : data.overtime,
				normal : data.normal === true ? 1 : 0,
     			change_memo : data.changememo
     		};
			
     		var userId = SessionModel.get("user").id;
			
			var inChangeModel = _getChangeHistoryModel("in_time", newData, this.selectData, userId, data.changememo);
			var outChangeModel = _getChangeHistoryModel("out_time", newData, this.selectData, userId, data.changememo);
			var overtimeChangeModel = _getChangeHistoryModel("overtime_code", newData, this.selectData, userId, data.changememo);
			var normal = _getChangeHistoryModel("normal", newData, this.selectData, userId, data.changememo);

			newData.changeHistoryCollection = new ChangeHistoryCollection();
			
			if (inChangeModel) {
				newData.changeHistoryCollection.add(inChangeModel);
			}else{
				newData.in_time = null;
			}
			
			if (outChangeModel) {
				newData.changeHistoryCollection.add(outChangeModel);
			}else{
				newData.out_time = null;
			}

			if (normal) {
				newData.changeHistoryCollection.add(normal);
			}else{
				if (!overtimeChangeModel) {
					newData.overtime_code = null;
				}
			}

			if (overtimeChangeModel) {
				newData.changeHistoryCollection.add(overtimeChangeModel);
			}else{
				newData.overtime_code = null;
			}
			
			if (newData.changeHistoryCollection.length === 0) {
				return null;
			}
     		if (newData.change_memo.length == 0) {
     			//Dialog.warning(i18nCommon.COMMUTE_RESULT_LIST.COMMENT_DIALOG.MSG.EMPTY_COMMENT_ERR);
     			return null;
     		}
			return newData;
		}
	});
	
	function _getChangeHistoryModel(changeColumn, newData, oriData, changeId, changememo ) {
		if (oriData[changeColumn] == newData[changeColumn]){
			return null;
		}else if (oriData[changeColumn] == null && newData[changeColumn] == " "){
			return null;
		} else {
			var changeHistoryModel = new ChangeHistoryModel({
				year : oriData.year,
				id : oriData.id,
				date : oriData.date,
				change_column : changeColumn,
				change_before : oriData[changeColumn],
				change_after : newData[changeColumn],
				change_id : changeId,
				change_memo : changememo
			});				
			return changeHistoryModel;
		}
	}
	
	return CommuteUpdatePopupView;
});