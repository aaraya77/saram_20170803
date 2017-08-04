define([
	'jquery',
	'jquery.ui',
	'underscore',
	'backbone',
	'core/BaseView',
	'schemas',
	'i18n!nls/common',
	'models/sm/SessionModel',

	'text!templates/default/head.html',
	'text!templates/gis/gisView.html',
	'text!templates/gis/gisViewTemplate.html',
	'text!templates/gis/person.html',

	'collection/sm/UserCollection',
	'collection/sm/DepartmentCollection',
], function(
	$, jui, _, Backbone, BaseView, Schemas, i18Common, SessionModel, 
	HeadHTML, ContentHTML, LayoutHTML, PersonTemplate,  
	UserCollection, DepartmentCollection,
){
    var GisView = BaseView.extend({
    	el:".side-container",
    	initialize:function(){
    	    this.option = {
        		    el:"gis_content", 

        		    pos_y1:40,
        		    pos_y2:100,
        		    pos_y3:200,
        		    pos_y4:260,
        		    pos_y5:320,

        		    draggingIndex : null,
			    moveIndex:-1,

			    userCollection:null,
        		};
    	},
	
	events: {
        	'click #gisSaveBtn' : 'onClickSaveBtn',
      	},

	onClickSaveBtn:function(){
		var $personList = $(this.el).find(".gis_position");
		for ( var i = 0 ; i < $personList.size() ; i++ ) {
			var $person = $($personList[i]);
			if ( $person.children().size() >= 2 ) {
				// 자리번호
				var pos_id = $person[0].id;

				// 사번
				var p = $person.children()[1];
				var id = p.id;

				// 사번 정보를 찾아 자리 정보가 다른 경우 업데이트 하도록 함.
				var userModel = this.option.userCollection.get(id);
				if ( _.isUndefined(userModel) && userModel.attributes["gis_pos"] != pos_id ) {
					
				}
			}
		}
	},

    	addDragEvent:function() {
		var _this = this;
    		$(this.el).find(".gis_person").draggable({
    			// appendTo : ".gis_position",
    			helper: 'clone',
    			scroll: false,
    			//revert: true,
    			// stack: "div",
    			start : function(event,ui){
				_this.option.moveIndex = $(this).attr("id");
				console.log("start : " + _this.option.moveIndex);
    				// $(this).draggable("option", "revert", true);
    				// $(this).draggable("option", "appendTo", "#gis_main");
    				$(".gis_person").css("zIndex", 10);
    				$(this).css("zIndex", 100);
    			},
			stop : function(event, ui){
				_this.option.moveIndex = -1;
				console.log("end : " + _this.option.moveIndex);
			}
    		});

    		$(this.el).find(".gis_position").droppable({
    			drop : function(event, ui) {
				if ( _this.option.moveIndex != -1 ) {
					if ( $(this).children().size() >= 2 ) {
						console.log("already exitst");
						var alreadyExistNode = $(this).children()[1];
						$(_this.el).find("#gis_member_list").append(alreadyExistNode);
					}
					var $person = $(_this.el).find("#"+_this.option.moveIndex);
					$person.parent().removeClass("added");

					$(this).append($(_this.el).find("#"+_this.option.moveIndex));
					$(this).addClass("added");
				}	
    			//	ui.draggable.draggable("option", "revert", false);
    			}
    		});

//    		$(this.el).find(".gis_member_list").droppable({
//    			drop : function(event, ui) {
//    				ui.draggable.draggable("option", "revert", false);
//    			}
//    		});

		$(this.el).find("#gis_member_list").droppable({
    			drop : function(event, ui) {
    				if ( _this.option.moveIndex != -1 ) {
					var $person = $(_this.el).find("#"+_this.option.moveIndex);
					$person.parent().removeClass("added");
					$(this).append($person);
    				}
    			}
    		});

    		
    	},

	onSave:function() {
			
	},
		onDropToPosition:function (target) {
			var childNodes = target.currentTarget.childNodes;
			if ( childNodes.length != 0 ) {
				for ( var i = childNodes.length - 1 ; i >= 0; i-- ) {
					var existNode = childNodes[i];
					var memberList = $(this.el).find("#gis_member_list");
					memberList[0].appendChild(document.getElementById(existNode.id));	
				}
			}

			target.currentTarget.appendChild(document.getElementById(this.option.draggingIndex));
		},

		onDropToList:function (target) {
			var memberList = $(this.el).find("#gis_member_list");
			memberList[0].appendChild(document.getElementById(this.option.draggingIndex));	
		},

		onDragEnter:function() {
			return false;
		},

		onDragOver:function() {
			return false;
		},
  	
    	render:function(){
    	    var _headSchema=Schemas.getSchema('headTemp');
    	    var _headTemp=_.template(HeadHTML);
    	    var _layOut=$(LayoutHTML);
    	    //Head 
    	    var date = new Date();
    	    var yyyy = date.getFullYear().toString();
    	    var mm = (date.getMonth()+1).toString();
    	    var dd  = date.getDate().toString();
    	    var mmChars = mm.split('');
    	    var ddChars = dd.split('');
    	    var dateTime = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    	    
    	    var _head=$(_headTemp(_headSchema.getDefault({title:i18Common.GIS.TITLE, subTitle:dateTime})));
    	    _head.addClass("left-padding");
    	    _head.addClass("relative-layout"); 	     
    	    $(_head).find("small").addClass("small");    	      	        	    
    	    var _content=$(ContentHTML).attr("id", this.option.el);	   
    	    _layOut.append(_head);
    	    _layOut.append(_content);
    	    $(this.el).html(_layOut);
			
			var promiseArr = [];
    	    this.option.userCollection = new UserCollection();
    	    promiseArr.push(this.option.userCollection.fetch());
    	    var departmentCollection = new DepartmentCollection();
    	    promiseArr.push(departmentCollection.fetch());
    	    var _this = this;
    	    
    	    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    	    // 자리 위치 설정 총 63자리
    	    // 1 : 사장님
    	    // 2 : 부사장님
    	    // 3 ~ 6 : 관리부
    	    // 10 ~ 19 : y1 ( 최상단 라인 )
    	    // 30 ~ 40 : y2
    	    // 50 ~ 63 : y3
    	    // 70 ~ 83 : y4
    	    // 90 ~ 97 : y5
    	    
    	    var gisMainDiv = $(this.el).find("#gis_main");
    	    var htmlStr = "<div id='<ID>' class='gis_position' style='top:<TOP>px; left:<LEFT>px;'><div class='num'><NUM></div></div>";

    	    // 1 : 사장님
    	    var htmlStr2 = htmlStr.replace("<ID>", "gis_pos_01").replace("<TOP>", "240").replace("<LEFT>", "60").replace("<NUM>", 1);
    	    gisMainDiv.append(htmlStr2);

   //  	    // 2 : 부사장님
			htmlStr2 = htmlStr.replace("<ID>", "gis_pos_02").replace("<TOP>", "60").replace("<LEFT>", "60").replace("<NUM>", 2);
    	    gisMainDiv.append(htmlStr2);

   //  	    // 3 ~ 6 : 관리부
    	    htmlStr2 = htmlStr.replace("<ID>", "gis_pos_03").replace("<TOP>", "203").replace("<LEFT>", "351").replace("<NUM>", 3);
    	    gisMainDiv.append(htmlStr2);
    	    htmlStr2 = htmlStr.replace("<ID>", "gis_pos_04").replace("<TOP>", "272").replace("<LEFT>", "295").replace("<NUM>", 4);
    	    gisMainDiv.append(htmlStr2);
    	    htmlStr2 = htmlStr.replace("<ID>", "gis_pos_05").replace("<TOP>", "272").replace("<LEFT>", "357").replace("<NUM>", 5);
    	    gisMainDiv.append(htmlStr2);
    	    htmlStr2 = htmlStr.replace("<ID>", "gis_pos_06").replace("<TOP>", "332").replace("<LEFT>", "357").replace("<NUM>", 6);
    	    gisMainDiv.append(htmlStr2);

    	    // 10 ~ 19 : y1 ( 최상단 라인 )
    	    var posLeft = 760;
    	    for ( var i = 10 ; i <= 13 ; i++ ) {
    	    	htmlStr2 = htmlStr.replace("<ID>", "gis_pos_"+i).replace("<TOP>", this.option.pos_y1).replace("<LEFT>", posLeft).replace("<NUM>", i);
    	    	gisMainDiv.append(htmlStr2);
    	    	if ( i % 2 == 0 )
    	    		posLeft += 58;
    	    	else
    	    		posLeft += 50;
    	    }
    	    posLeft += 15;
    	    for ( var i = 14 ; i <= 20 ; i++ ) {
    	    	
    	    	if ( i == 18 ) {
    	    		posLeft += 50;
    	    		continue;
    	    	}

    	    	htmlStr2 = htmlStr.replace("<ID>", "gis_pos_"+i).replace("<TOP>", this.option.pos_y1).replace("<LEFT>", posLeft).replace("<NUM>", i);
    	    	gisMainDiv.append(htmlStr2);
    	    	if ( i % 2 == 1 )
    	    		posLeft += 58;
    	    	else
    	    		posLeft += 50;
    	    }

    	    // 30 ~ 40 : y2
    	    posLeft = 760;
    	    for ( var i = 30 ; i <= 33 ; i++ ) {
    	    	htmlStr2 = htmlStr.replace("<ID>", "gis_pos_"+i).replace("<TOP>", this.option.pos_y2).replace("<LEFT>", posLeft).replace("<NUM>", i);
    	    	gisMainDiv.append(htmlStr2);
    	    	if ( i % 2 == 0 )
    	    		posLeft += 58;
    	    	else
    	    		posLeft += 50;

    	    }
    	    posLeft += 15;
    	    for ( var i = 34 ; i <= 40 ; i++ ) {
    	    	htmlStr2 = htmlStr.replace("<ID>", "gis_pos_"+i).replace("<TOP>", this.option.pos_y2).replace("<LEFT>", posLeft).replace("<NUM>", i);
    	    	gisMainDiv.append(htmlStr2);
    	    	if ( i % 2 == 1 )
    	    		posLeft += 58;
    	    	else
    	    		posLeft += 50;
    	    }


    	    // 50 ~ 63 : y3
			posLeft = 608;
    	    for ( var i = 50 ; i <= 63 ; i++ ) {
    	    	htmlStr2 = htmlStr.replace("<ID>", "gis_pos_"+i).replace("<TOP>", this.option.pos_y3).replace("<LEFT>", posLeft).replace("<NUM>", i);
    	    	gisMainDiv.append(htmlStr2);
    	    	if ( i % 2 == 0 )
    	    		posLeft += 58;
    	    	else
    	    		posLeft += 50;
    	    }


    	    // 70 ~ 83 : y4
    	    posLeft = 608;
    	    for ( var i = 70 ; i <= 83 ; i++ ) {
    	    	htmlStr2 = htmlStr.replace("<ID>", "gis_pos_"+i).replace("<TOP>", this.option.pos_y4).replace("<LEFT>", posLeft).replace("<NUM>", i);
    	    	gisMainDiv.append(htmlStr2);
    	    	if ( i % 2 == 0 )
    	    		posLeft += 58;
    	    	else
    	    		posLeft += 50;
    	    }


    	    // 90 ~ 97 : y5
    	    //				   90   91   92   93   94    95    96    97 
    	    var leftPosList = [593, 714, 820, 922, 1005, 1148, 1255, 1314];
    	    for ( var i = 90 ; i <= 97 ; i++ ) {
    	    	htmlStr2 = htmlStr.replace("<ID>", "gis_pos_"+i).replace("<TOP>", this.option.pos_y5).replace("<LEFT>", leftPosList[i-90]).replace("<NUM>", i);
    	    	gisMainDiv.append(htmlStr2);	
    	    }   	    

    	    // 사원 정보를 지정된 자리에 배치
    	    $.when.apply($, promiseArr).then(function(userParam, deptParam){
    	    	var userList = userParam[0];
    	    	var deptList = deptParam[0];

				var deptMap = {};
				for ( var deptIdx = 0 ; deptIdx < deptList.length ; deptIdx++ ) {
					var dept = deptList[deptIdx];
					deptMap[dept.code] = dept;
				}

    	    	var gis_member_list = $(_this.el).find("#gis_member_list");
    	    	for ( var userIdx = 0 ; userIdx < userList.length ; userIdx++ ) 
    	    	{
    	    		// 수원 제외  ( 부서 기준 )
    	    		var user = userList[userIdx];
    	    		if ( deptMap[user.dept_code].area != "서울" ) {
    	    			continue;
    	    		}

					// 퇴사자 제외
    	    		if ( user.leave_company != "" ) {
    	    			continue;
    	    		}

    	    		var htmlTag = PersonTemplate.replace("<USER_ID>", user.id).replace("<USER_NAME>", user.name).replace("<PIC_SRC>", "/userpic?file="+user.id);

    	    		// 자리 배치가 이미 되어 있는 경우 지정된 자리로 설정
    	    		// if ( ... )
    	    		gis_member_list.append(htmlTag);

    	    	}

    	    	// 이벤트 추가
    	    	_this.addDragEvent();
    	    	
    	    });

    	    // 상단 : 자리 배치 정보가 없는 member ( 관리자 )

    	    // 하단 : 자리 배치 png background 로 출력 후 지정된 자리에 member를 출력

    	    

    	    // 저장 버튼 ( 관리자 )







			// var partCollection = new PartCollection();
   //  	    promiseArr.push(partCollection.fetch());    

    	    // return target.html();

     	}
    });
    return GisView;
});
