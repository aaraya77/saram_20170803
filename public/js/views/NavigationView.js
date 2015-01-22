define([
  'jquery',
  'underscore',
  'backbone',
  'animator',
  'dialog',
  'i18n!nls/common',
  'core/BaseView',
  'text!templates/navigation.html',
  'data/menu',
  'models/sm/SessionModel',
  'models/common/RawDataModel',
  'views/sm/ConfigUserView',
], function($, _, Backbone, animator,Dialog, i18Common, 
		BaseView, navigation, Menu, SessionModel, RawDataModel, ConfigUserView){
  
    
        // <li class="dropdown">
        //   <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">일반 관리<span class="caret"></span></a>
        //   <ul class="dropdown-menu" role="menu">
        //     <li><a href="#usermanager">사원 관리</a></li>
        //     <li><a href="#holidaymanager">휴일 관리</a></li>
        //     <li><a href="#vacation">연차 관리</a></li>
        //     <!--li class="divider"></li-->
        //   </ul>
        // </li>
  var NavigationView = BaseView.extend({
    el: "#mainNavigation",
  	initialize:function(){
  		_.bindAll(this, 'render');
  		_.bindAll(this, 'show');
  		_.bindAll(this, 'hide');
  	},  	
    render: function(){
        $(this.el).append(navigation);
        var _auth= SessionModel.getUserInfo().admin;
        var _liTag='<li class="dropdown"></li>';     
        var _aTag='<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"></a>';
        var _subUlTag='<ul class="dropdown-menu" role="menu"></ul>';
        var _subliTag="<li></li>";
        
        var _leftMenu=$("#top_menu_left");
        
        for (var name in Menu) {//상위 메뉴 생성
            var _menu=Menu[name];
            
            var li=$(_liTag);
            var a=$(_aTag);
            a.html(_menu.title+'<span class="caret"></span>');
            li.append(a);
            
            var _subMenu=_menu.subMenu;//하위 메뉴 생성
            var subUl=$(_subUlTag);
            for (var subName in _subMenu){
                var subMenu=_subMenu[subName];
                if (subMenu.auth <= _auth){//로그인 사용자의 admin 값보다 같거나 작을 때만 보여짐
                    var subLi=$(_subliTag);
                    var subA=$('<a href="'+subMenu.hashTag+'">'+subMenu.title+'</a>');
                    subLi.append(subA);
                    subUl.append(subLi);
                }
            }
            li.append(subUl);
            _leftMenu.append(li);
        }
        
        $("#userConifg").html('<span class="glyphicon glyphicon-user"></span> ' + SessionModel.getUserInfo().name);
        animator.animate(this.el, animator.FADE_IN_DOWN);
    },
    events: {
		'click #logout': 'logout',
		'click #userConifg' :'userConifg',
		'click #accessIn' : 'accessIn',
		'click #accessOut' : 'accessOut'
    },
    show:function(){
      var _view=this;
      $(_view.el).fadeIn();
    },
    hide:function(callback){
      var _view=this;
      $(_view.el).fadeOut();
    },
	logout:function(){
		SessionModel.logout();
	},
	userConifg:function(){
		var configView=new ConfigUserView();
		Dialog.show({
            title:i18Common.DIALOG.TITLE.USER_UPDATE, 
            content:configView, 
            buttons:[{
                label: i18Common.DIALOG.BUTTON.SAVE,
                cssClass: Dialog.CssClass.SUCCESS,
                action: function(dialogRef){// 버튼 클릭 이벤트
                    configView.submitSave().done(function(data){
                        dialogRef.close();
                    });//실패 따로 처리안함 add화면에서 처리.
                }
            }, {
                label: i18Common.DIALOG.BUTTON.CLOSE,
                action: function(dialogRef){
                    dialogRef.close();
                }
            }]
            
        });
	},
	accessIn: function() {
		var model = new RawDataModel();
		model.companyAccessUrl().save({type:'출근(수원)'}, {
    		success: function(model, response) {
    			Dialog.show("출근 등록 되었습니다.");
         	}, error : function(model, res){
         		Dialog.show("출근 등록이 실패했습니다.");
         	}
		});
	},
	accessOut: function() {
		var model = new RawDataModel();
		model.companyAccessUrl().save({type:'퇴근(수원)'}, {
    		success: function(model, response) {
    			Dialog.show("퇴근 등록 되었습니다.");
         	}, error : function(model, res){
         		Dialog.show("퇴근 등록이 실패했습니다.");
         	}
		});
	}
  });
  return NavigationView;
});