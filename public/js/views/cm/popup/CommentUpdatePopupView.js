/**
 * 근태 자료 comment 수정 팝업
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
    'core/BaseView',
    'models/sm/SessionModel',
    'models/cm/CommentModel',
    'models/cm/CommuteModel',
    'models/cm/ChangeHistoryModel',
    'collection/cm/CommuteCollection',
    'collection/cm/ChangeHistoryCollection',
    'text!templates/inputForm/textbox.html',
	'text!templates/inputForm/textarea.html',
	'text!templates/default/datepickerChange.html',
	'text!templates/inputForm/combobox.html',
], function(
	$, _, Backbone,	Util, Schemas, Grid, Dialog, Datatables, Moment, ResultTimeFactory, BaseView, 
	SessionModel, CommentModel, CommuteModel, ChangeHistoryModel, CommuteCollection, ChangeHistoryCollection,
	TextBoxHTML, TextAreaHTML, DatePickerChangeHTML, ComboboxHTML
) {
	var resultTimeFactory = ResultTimeFactory.Builder;
	var CommentPopupView = Backbone.View.extend({
		initialize : function(data) {
			this.selectData = data;
		},
		events :{
			"click label input[type='checkbox']" : "setDatapickerDisable"
		},
		render: function(el) {
			var dfd= new $.Deferred();
			
			if (!_.isUndefined(el)) this.el=el;
            var that = this;

    		$(that.el).append(_.template(TextBoxHTML)({id: "commentUpdatePopupDate", label : "일자", value : that.selectData.date}));
			$(that.el).append(_.template(TextBoxHTML)({id: "commentUpdatePopupName", label : "이름", value : that.selectData.name + " ("+that.selectData.id+")"}));
			$(that.el).append(_.template(DatePickerChangeHTML)(
				{
					id: "commentUpdatePopupInTime", 
					label : "출근시간",
					beforeTime:  this.selectData.before_in_time,
					checkId : "commentUpdatePopupInTimeCheck",
				}
			));
			
			$(that.el).append(_.template(DatePickerChangeHTML)(
				{
					id: "commentUpdatePopupOutTime", 
					label : "퇴근시간",
					beforeTime:  this.selectData.before_out_time,
					checkId : "commentUpdatePopupOutTimeCheck",
				}
			));
			$(that.el).append(_.template(TextAreaHTML)({id: "commentUpdatePopupComment", label : "접수내용"}));
			$(that.el).append(_.template(TextAreaHTML)({id: "commentUpdatePopupReply", label : "처리내용"}));
			
		   	$(that.el).append(_.template(ComboboxHTML)({id: "commentUpdatePopupState", label: "상태"}));
		   	
		   	var _stateCombo = $(that.el).find("#commentUpdatePopupState");
		   	_stateCombo.append($("<option>접수중</option>"));
		   	_stateCombo.append($("<option>처리중</option>"));
		   	_stateCombo.append($("<option>처리완료</option>"));
		   	_stateCombo.val(that.selectData.state);
		   	
			$(that.el).find("#commentUpdatePopupInTime").datetimepicker({
            	pickTime: true,
		        language: "ko",
		        todayHighlight: true,
		        format: "YYYY-MM-DD HH:mm:SS",
		        defaultDate: Moment(that.selectData.want_in_time).format("YYYY-MM-DD HH:mm:ss")
            });
            
			$(that.el).find("#commentUpdatePopupOutTime").datetimepicker({
            	pickTime: true,
		        language: "ko",
		        todayHighlight: true,
		        format: "YYYY-MM-DD HH:mm:SS",
		        defaultDate: Moment(that.selectData.want_out_time).format("YYYY-MM-DD HH:mm:ss")
            });

			$(that.el).find("#commentUpdatePopupDate").attr("disabled", "true");
			$(that.el).find("#commentUpdatePopupName").attr("disabled", "true");
			$(that.el).find("#commentUpdatePopupComment").val(that.selectData.comment);
			$(that.el).find("#commentUpdatePopupComment").attr("disabled", "true");
			
			$(that.el).find("#commentUpdatePopupReply").val(that.selectData.comment_reply);
			
			// 일반 사용자는 단순 읽기만 가능
			if (SessionModel.get("user").admin == 0 || $(this.el).find("#commentUpdatePopupState").val() == "처리완료") {
				$(that.el).find("#commentUpdatePopupInTime input").attr("disabled","true");
				$(that.el).find("#commentUpdatePopupOutTime input").attr("disabled","true");
				$(that.el).find("#commentUpdatePopupComment").attr("disabled", "true");
				$(that.el).find("#commentUpdatePopupReply").attr("disabled", "true");
				$(that.el).find("#commentUpdatePopupState").prop("disabled", true);
				$(that.el).find("[type='checkbox']").css("display","none");
			}else{
				 $(that.el).find("[type='checkbox']").click(function(){
				 	that.setDatapickerDisable();
				 });
			}
			that.setDatapickerDisable();
    		dfd.resolve();
	    		
			return dfd.promise();			
		},
		
		setDatapickerDisable : function(){
			var inCheck = $(this.el).find("#commentUpdatePopupInTimeCheck").prop('checked');
			var outCheck = $(this.el).find("#commentUpdatePopupOutTimeCheck").prop('checked');
					
			if(!_.isUndefined(inCheck))
				$(this.el).find("#commentUpdatePopupInTime input").attr("disabled", !inCheck);	
			if(!_.isUndefined(outCheck))
				$(this.el).find("#commentUpdatePopupOutTime input").attr("disabled", !outCheck);	
		},
		getDatapickerDisable : function(){
			var data = {
				inCheck : $(this.el).find("#commentUpdatePopupInTimeCheck").prop('checked'),
				outCheck : $(this.el).find("#commentUpdatePopupOutTimeCheck").prop('checked')
			};
			return data;
		},
		saveComment : function(data){
			var dfd = new $.Deferred();
			var commentModel = new CommentModel();
			commentModel.save(data,{
				success : function(){
					dfd.resolve();
				}
			});
			return dfd.promise();
		},
		saveCommute : function(data){
			// 이틀치 Commute 데이터 가져옴
			var dfd = new $.Deferred();
			var commuteCollection = new CommuteCollection();
			commuteCollection.fetch({ 
     			data: {
     				id : this.selectData.id,
     				startDate : this.selectData.date,	
     				endDate : Moment(this.selectData.date).add(1, 'days').format("YYYY-MM-DD"),
     			},
     			success : function(resultCollection){
					resultTimeFactory.modifyByCollection( // commute_result 수정
						resultCollection,
						data,
						data.changeHistoryCollection
					).done(function(resultCommuteCollection){ // commute_result 수정 성공!
						dfd.resolve(resultCommuteCollection);		
     				}).fail(function(){
     					dfd.reject();
     				});
     			}
			});
			return dfd.promise();
		},
		updateComment: function() {
			var dfd = new $.Deferred();
			var that = this;
			var inData = this.getInsertData();
			
			if (inData == null) {
				return;
			}
			
			var userId = SessionModel.get("user").id;
			inData._id = userId;
			
			if(inData.changeHistoryCollection.length == 0){
				Dialog.confirm({
					msg : "출/퇴근 시간이 수정되지 않았습니다. 진행하시겠습니까?",
	                buttons : [{
	                    label: "확인",
	                    cssClass: Dialog.CssClass.PRIMARY,
	                    action: function(dialogRef){// 버튼 클릭 이벤트
	                    	that.saveComment(inData).done(
								function(){
									dfd.resolve();
									dialogRef.close();
								}
							);
	                    }
	                },{
	                    label: "취소",
	                    action: function(dialogRef){// 버튼 클릭 이벤트
	                    	dialogRef.close();
	                    }
	                }]
	            });
			}else{
				var message = "";
				_.each(inData.changeHistoryCollection.models, function(model){
					if(model.get("change_column") == "in_time"){
						message = message + "출근시간 [ " + model.get("change_before") + " > " +model.get("change_after") + "]\n";
					}else{
						message = message + "퇴근시간 [ " + model.get("change_before") + " > " +model.get("change_after") + "]\n";
					}
				});
					
				message = message + "\n수정내용이 정확합니까?";
				Dialog.confirm({
					msg : message,
	                buttons : [{
	                    label: "확인",
	                    cssClass: Dialog.CssClass.PRIMARY,
	                    action: function(dialogRef){// 버튼 클릭 이벤트
	                    	that.saveComment(inData).done(
	                    		function(){
	                    			that.saveCommute(inData).done(function(result){
										dfd.resolve();	
										dialogRef.close();
									});
	                    		}
	                    	);
	                    }
	                },{
	                    label: "취소",
	                    action: function(dialogRef){// 버튼 클릭 이벤트
	                    	dialogRef.close();
	                    }
	                }]
	            });
			}
			return dfd.promise();
		},
		getInsertData: function() {
     		var newData = {
     			id: this.selectData.id,
     			year: this.selectData.year,
     			date: this.selectData.date,
     			comment_reply: $(this.el).find("#commentUpdatePopupReply").val(),
     			state: $(this.el).find("#commentUpdatePopupState").val(),
     			changeInTime: null,
     			changeOutTime : null,
     			changeHistoryCollection : new ChangeHistoryCollection(),
     		};
     		
     		if (newData.comment_reply == "" ) {
     			alert("처리 내용을 입력해주시기 바랍니다. ");
     			return null;
     		}
     		
			var userId = SessionModel.get("user").id;
			
     		var checkResult = this.getDatapickerDisable();
     		
     		if(checkResult.inCheck){
     			newData.changeInTime = $(this.el).find("#commentUpdatePopupInTime").data("DateTimePicker").getDate().format("YYYY-MM-DD HH:mm:ss");
     			var inChangeModel = this._getChangeHistoryModel("in_time", newData.changeInTime, this.selectData.before_in_time, userId);
     			if (inChangeModel)
					newData.changeHistoryCollection.add(inChangeModel);
			
     		}
     		
     		if(checkResult.outCheck){
     			newData.changeOutTime = $(this.el).find("#commentUpdatePopupOutTime").data("DateTimePicker").getDate().format("YYYY-MM-DD HH:mm:ss");
     			var outChangeModel = this._getChangeHistoryModel("out_time", newData.changeOutTime, this.selectData.before_out_time, userId);
     			if (outChangeModel)
					newData.changeHistoryCollection.add(outChangeModel);
     		}
     		
			return newData;
		},
		_getChangeHistoryModel :function(changeColumn, newData, oriData, changeId ) {
		if(newData == oriData){
			return null;
		}
		
		var changeHistoryModel = new ChangeHistoryModel({
			year : this.selectData.year,
			id : this.selectData.id,
			date : this.selectData.date,
			change_column : changeColumn,
			change_before : oriData,
			change_after : newData,
			change_id : changeId 
		});				
		return changeHistoryModel;
	
	}
	});
	
	
	
	return CommentPopupView;
});