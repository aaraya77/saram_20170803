define([
  'jquery',
  'underscore',
  'backbone',
  'core/BaseView',
  'grid',
  'lodingButton',
  'schemas',
  'i18n!nls/common',
  'dialog',
  'util',
  'models/sm/SessionModel',
  'text!templates/default/head.html',
  'text!templates/default/content.html',
  'text!templates/layout/default.html',
  'collection/sm/UserCollection',
  'views/sm/popup/AddUserView',
  'views/sm/popup/EditUserView',
  'models/sm/UserModel',
  'text!templates/default/button.html',
], function($, _, Backbone, BaseView, Grid, LodingButton, Schemas, i18Common, Dialog, Util, SessionModel, HeadHTML, ContentHTML, LayoutHTML,  UserCollection, AddUserView, EditUserView,  UserModel, ButtonHTML){
    var userListCount=0;
    var _currentFilter=0;
    var UserListView = BaseView.extend({
        el:".main-container",
    	initialize:function(){
    	    var userCollection= new UserCollection();
    	    var _id="userList_"+(userListCount++);
    		this.option = {
    		    el:_id+"_content",
    		    column:[
              // 0 사번
              { "title" : i18Common.USER.ID, data:"id", visible:false, subVisible:false},

              // 1 이름
              { "title" : i18Common.USER.NAME, data:"name", 
                render: function(data,type,row){
                  var temp = $("<span class='userpic glyphicon glyphicon-user'style='margin:10px;' data-id='"+row.id+"'aria-hidden='true'></span>");
                    return temp.wrap('<p>').parent().html() + data;
                }
              },

              // 2 직급코드
              { "title" : "직급코드", data:"position_code", visible:false, subVisible:false},

              // 3 직급
              { "title" : i18Common.USER.POSITION, 
                render:function(data, type, row) {
                  return row.position_name;
                }
              },

              // 4 부서
              { "title" : i18Common.USER.DEPT, 
                "render": function(data, type, row){
                  return row.dept_name;
                }
              },

              // 5 이름
              { "title" : i18Common.USER.NAME_COMMUTE, data:"name_commute", visible:false, subVisible:false},
              // 6 입사일
              { "title" : i18Common.USER.JOIN_COMPANY, data:"join_company", visible:false, subVisible:false},
              // 7 퇴사일
              { "title" : i18Common.USER.LEAVE_COMPANY, data:"leave_company", visible:false, subVisible:false},
              // 8 관리자 등급
              { "title" : i18Common.USER.ADMIN, visible:false, subVisible:false,
                "render": function(data, type, row){
                  return i18Common.CODE['ADMIN_' + row.admin]
                }
              },
              // 9. 소속 ( 본사 / 외주 )
              { "title" : i18Common.USER.AFFILIATED, visible:false, subVisible:false,
                "render": function(data, type, row){
                  var result=i18Common.CODE.AFFILIATED_0;
                  if (row.affiliated > 0){
                      result=i18Common.CODE.AFFILIATED_1;
                  }
                  return result;
                }
              },
              // 10. 전화번호
              { "title" : i18Common.USER.PHONE, data:"phone"},
              // 11. 이메일
              { "title" : i18Common.USER.EMAIL, data:"email"},
              // 12. 결재자
              { "title" : i18Common.USER.APPROVAL_NAME, data:"approval_name"},
              { "title" : "approval_id", data:"approval_id", visible:false, subVisible:false},
              { "title" : i18Common.USER.IP, data:"ip_pc", visible:false, subVisible:false},
              { "title" : i18Common.USER.OFFICE_IP, data:"ip_office", visible:false, subVisible:false},
              { "title" : i18Common.USER.PHONE_OFFICE, data:"phone_office", visible:false},
              { "title" : i18Common.USER.BIRTHDAY, data:"birthday", visible:false},
              { "title" : i18Common.USER.WEDDING_DAY, data:"wedding_day", visible:false}, 
              { "title" : i18Common.USER.EMERGENCY_PHONE, data:"emergency_phone", visible:false},
              { "title" : i18Common.USER.PRIVILEGE, visible:false, subVisible:false,
                "render": function(data, type, row){
                  var result=i18Common.CODE.PRIVILEGE_1;
                  if (row.privilege == 3){
                      result=i18Common.CODE.PRIVILEGE_3;
                  } else if (row.privilege == 2){
                      result=i18Common.CODE.PRIVILEGE_2;
                  }
                  return result;
                }
              }
            ],
    		    dataschema:["id", "name", "position_code", "position_name", "position_code", "dept_code",  "name_commute", "join_company", "leave_company", "admin",   "phone", "email", "approval_name", "approval_id",
    		      "ip_pc", "ip_office", "phone_office" , "birthday", "wedding_day", "emergency_phone", "privilege" ,"affiliated"
    		    ],
    		    collection:userCollection,
    		    detail:true,
    		    view:this,
    		    order:[[2, "asc"]],
    		};
    	},
    	events : {
    	    "mouseover .userpic" : "over",
    	    "mouseleave .userpic" : "leave",
    	},
    	over:function(event){
    	    var id = $(event.currentTarget).data("id");
    	    var picdiv = $("<div id='picdiv' style='position: absolute; z-index: 1000;border:solid 1px #2ABB9B;padding: 2px; background-color:white'></div>");
    	    var img = $("<img src='/userpic?file="+id+"' height='140' width='100'>");
    	    
    	    var windowHeight = $(window).height();
    	    var top = event.pageY + 25;
    	    var left = event.pageX + 5;
    	    top = windowHeight < top + 180 ? top-190 : top;
    	    
    	    picdiv.css("top", top);
    	    picdiv.css("left", left);
    	    picdiv.append(img);
    	    
    	    $(this.el).append(picdiv);
    	},
    	leave:function(){
    	    $(this.el).find("#picdiv").remove();
    	},
    	render:function(){
    	    var _headSchema=Schemas.getSchema('headTemp');
    	    var _headTemp=_.template(HeadHTML);
    	    var _layOut=$(LayoutHTML);
    	    //Head 
    	    var _head=$(_headTemp(_headSchema.getDefault({title:i18Common.PAGE.TITLE.USER_MANAGER, subTitle:i18Common.PAGE.SUB_TITLE.USER_LIST})));
    	    _head.addClass("no-margin");
    	    _head.addClass("relative-layout");
    	    
    	    //grid button add;
    	    var _buttons=["search"];
    	    
    	    var _filterText=[i18Common.CODE.ALL, i18Common.CODE.WORKER, i18Common.CODE.LEAVE_USER];
    	    _buttons.push({
    	        type:"custom",
    	        name:"filter",
    	        tooltip:i18Common.TOOLTIP.USER.TYPE,//"사용자 유형",
    	        filterBtnText:_filterText,
    	        click:function(_grid, _button){
    	           var filters=[
    	                function(){
    	                    return true;
    	                },
    	                function(data){
    	                    var _joinDate=data[7];
    	                    var _levDate=data[8];
    	                    return (!_.isEmpty(_joinDate))&&(_.isEmpty(_levDate));
    	                },
    	                function(data){
    	                    var _levDate=data[8];
    	                    return !_.isEmpty(_levDate);
    	                }
    	           ];
    	           
                   if (_currentFilter==2){
                        _currentFilter=0;
                   } else {
    	                _currentFilter++;
                   }
                   
                   _button.html(_filterText[_currentFilter]);
                   _grid.setBtnText(_button, _filterText[_currentFilter]);
                   _grid.filtering(function(data){
                       var fn=filters[_currentFilter];
                       return fn(data);
                   }, "userType");
                }
    	    });
    	    
    	    if (this.actionAuth.add){
    	        _buttons.push({//User Add
        	        type:"custom",
        	        name:"add",
        	        tooltip:i18Common.TOOLTIP.USER.ADD,//"사용자 등록",
        	        click:function(){
                        var addUserView= new AddUserView();
                        Dialog.show({
                            title:i18Common.DIALOG.TITLE.USER_ADD, 
                            content:addUserView, 
                            buttons:[{
                                label: i18Common.DIALOG.BUTTON.ADD,
                                cssClass: Dialog.CssClass.SUCCESS,
                                action: function(dialogRef){// 버튼 클릭 이벤트
                                    var _btn=this;
                                    var beforEvent,affterEvent;
                                    
                                    beforEvent=function(){
                                        $(_btn).data('loading-text',"<div class='spinIcon'>"+i18Common.DIALOG.BUTTON.ADD +"</div>");
                                        // $(_btn).button('loading');
                                    };
                                    affterEvent=function(){
                                        // $(_btn).button('reset');
                                    };
                                    LodingButton.createSpin($(_btn).find(".spinIcon")[0]);
                                    addUserView.submitAdd(beforEvent, affterEvent).done(function(data){
                                        grid.addRow(data);
                                        Util.destoryDateTimePicker(true); dialogRef.close();
                                        Dialog.show(i18Common.SUCCESS.USER.ADD);
                                    });//실패 따로 처리안함 add화면에서 처리.
                                }
                            }, {
                                label: i18Common.DIALOG.BUTTON.CLOSE,
                                action: function(dialogRef){
                                    Util.destoryDateTimePicker(true); dialogRef.close();
                                }
                            }]
                            
                        });
                    }
        	    });
    	    }
    	    
    	    if (this.actionAuth.edit){
        	    _buttons.push({//User edit
        	        type:"custom",
        	        name:"edit",
        	        tooltip:i18Common.TOOLTIP.USER.EDIT, //"사용자 수정",
        	        click:function(_grid){
        	            var selectItem=_grid.getSelectItem();
                        if (_.isUndefined(selectItem)){
                            Dialog.warning(i18Common.GRID.MSG.NOT_SELECT_ROW);
                        } else {
                            var editUserView= new EditUserView(selectItem);
                            Dialog.show({
                                title:i18Common.DIALOG.TITLE.USER_UPDATE, 
                                content:editUserView, 
                                buttons:[{
                                   label: '재입사',
                                    cssClass: Dialog.CssClass.SUCCESS,
                                    action: function(dialogRef){// 버튼 클릭 이벤트
                                        // 재확인
                                        Dialog.confirm({
                                            msg:"데이터 변경 및 재입사 처리 하시겠습니까?",
                                            action:function(){
                                                return editUserView.reJoinCompany();
                                            },
                                            actionCallBack:function(res){
                                                grid.updateRow(res);
                                                Util.destoryDateTimePicker(true); dialogRef.close();
                                                Dialog.show(i18Common.SUCCESS.USER.SAVE);
                                            },
                                            errorCallBack:function(){
                                            }
                                        });
                                    } 
                                },{
                                    label: i18Common.DIALOG.BUTTON.INIT_PASSWORD,
                                    cssClass: Dialog.CssClass.SUCCESS,
                                    action: function(dialogRef){// 버튼 클릭 이벤트
                                        editUserView.initializePassword().done(function(data){
                                            grid.updateRow(data);
                                            Util.destoryDateTimePicker(true); dialogRef.close();
                                            Dialog.show(i18Common.SUCCESS.USER.SAVE);
                                        });//실패 따로 처리안함 add화면에서 처리.
                                    }
                                },{
                                    label: i18Common.DIALOG.BUTTON.SAVE,
                                    cssClass: Dialog.CssClass.SUCCESS,
                                    action: function(dialogRef){// 버튼 클릭 이벤트
                                        editUserView.submitSave().done(function(data){
                                            grid.updateRow(data);
                                            Util.destoryDateTimePicker(true); dialogRef.close();
                                            Dialog.show(i18Common.SUCCESS.USER.SAVE);
                                        });//실패 따로 처리안함 add화면에서 처리.
                                    }
                                }, {
                                    label: i18Common.DIALOG.BUTTON.CLOSE,
                                    action: function(dialogRef){
                                        Util.destoryDateTimePicker(true); dialogRef.close();
                                    }
                                }]
                                
                            });
                        }
                    }
        	    });
    	    }    
            
            // 삭제 기능 제거 2019.06.05
    	    // if (this.actionAuth.remove){
        	//     _buttons.push({//User Remove
        	//         type:"custom",
        	//         name:"remove",
        	//         tooltip:i18Common.TOOLTIP.USER.REMOVE, //"사용자 삭제",
        	//         click:function(_grid){
            //             var selectItem=_grid.getSelectItem();
            //             if (_.isUndefined(selectItem)){
            //                 Dialog.warning(i18Common.GRID.MSG.NOT_SELECT_ROW);
            //             } else {
            //                 selectItem._id="-1";
            //                 Dialog.confirm({
            //                     msg:i18Common.CONFIRM.USER.REMOVE, //"Do you want Delete User?",
            //                     action:function(){
            //                        var userModel=new UserModel(selectItem);
            //                        return userModel.remove();
            //                     },
            //                     actionCallBack:function(res){//response schema
            //                         if (res.status){
            //                             _grid.removeRow(selectItem);
            //                             Dialog.show(i18Common.SUCCESS.USER.REMOVE);
            //                         }
            //                     },
            //                     errorCallBack:function(){
            //                         //dd.close();
            //                     }
            //                 });
            //             }
            //         }
        	//     });
    	    // }
    	    
    	    //Refresh
    	    _buttons.push("refresh");
    	    this.option.buttons=_buttons;
    	    this.option.fetchParam = {
    	        success : function(){
    	            grid._draw();
                    var filterBtn = $("#"+grid.getButton("filter"));
                    while(filterBtn.text() != "근무자"){
                        filterBtn.trigger("click");
                    }

    	        }
            };
            
            // 관리자인 경우 직급코드 출력
            if ( SessionModel.getUserInfo().admin == Schemas.ADMIN ) {
              // ID
              this.option.column[0].visible = true;
              this.option.column[0].subvisible = true;
              
              // 직급 코드  
              this.option.column[2].visible = true;
              this.option.column[2].subvisible = true;

              // 관리 권한
              this.option.column[8].visible = true;
              this.option.column[8].subvisible = true;
            }

    	    //grid 
    	    var _gridSchema=Schemas.getSchema('grid');
    	    var grid= new Grid(_gridSchema.getDefault(this.option));
    	    var _content=$(ContentHTML).attr("id", this.option.el);
    	    
    	    _layOut.append(_head);
    	    _layOut.append(_content);
    	    $(this.el).html(_layOut);
     	}
    });
    
    return UserListView;
});