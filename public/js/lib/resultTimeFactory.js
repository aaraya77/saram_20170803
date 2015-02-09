define([
  'jquery',
  'underscore',
  'cmoment',
  'models/cm/CommuteModel',
  'collection/cm/CommuteCollection',
  'collection/vacation/InOfficeCollection',
  'collection/vacation/OutOfficeCollection'
], function($, _, Moment,
    CommuteModel, CommuteCollection, InOfficeCollection, OutOfficeCollection
){
    var WORKTYPE = {
        NORMAL : "00",
        EARLY : "01",
        LATE : "10",
        EARLY_LATE : "11",
        ABSENTCE : "21",
        _ABSENTCE : "22",
        HOLIDAY : "30",
        VACATION : "31",
        _HOLIDAYWORK : "40",
        HOLIDAYWORK : "41",
        NOTINTIME : "50",
        NOTOUTTIME : "51"
    };
    
    var TIMEFORMAT = "HH:mm:ss";
    
    var DATEFORMAT = "YYYY-MM-DD";
    
    var DATETIMEFORMAT = "YYYY-MM-DD HH:mm:ss";
    
    var Builder = {
        id:                 "",
        name:               "",
        department:         "",
        year:               null,
        date:               null,
        workType:           WORKTYPE.NORMAL,
        standardInTime:     null,
        standardOutTime:    null,  
        earliestTime:       null,
        inTime:             null,
        inTimeType:         1,
        outTime:            null,
        outTimeType:        1,
        latestTime:         null,
        lateTime:           0,
        lateTimeOver:       0,
        overTime:           0,
        vacationCode:       null,
        outOfficeCode:      null,
        overtimeCode:       null,
        holidayData:        null,
        outOfficeStartTime: null,
        outOfficeEndTime:   null,
        inTimeChange:       0,
        outTimeChange:     0,
        overtimeCodeChange : 0,
        checkInOffice:      false,
        isSuwon: false,
        checkLate : true,
        checkEarly : true,
        earlyTime : 0,
        notPayOverTime :0,
        init : function(userId, userName, userDepartment){
            this.id = userId;
            this.name = userName;
            this.department = userDepartment;            
            this.year = null;
            this.date = null;
            this.standardInTime = null;
            this.standardOutTime = null;  
            this.earliestTime = null;
            this.inTime = null;
            this.inTimeType = 1;
            this.outTime = null;
            this.outTimeType = 1;
            this.latestTime = null;
            this.lateTime = 0;
            this.lateTimeOver = 0;
            this.overTime = 0;
            this.workType = WORKTYPE.NORMAL;
            this.vacationCode= null;
            this.outOfficeCode= null;
            this.overtimeCode = null;
            this.holidayData = null;
            this.outOfficeStartTime = null;
            this.outOfficeEndTime = null;
            this.inTimeChange = 0;
            this.outTimeChange = 0;
            this.overtimeCodeChange = 0;
            this.checkInOffice = false;
            this.checkLate = true;
            this.checkEarly =true;
            this.earlyTime = 0;
            this.notPayOverTime =0;
            if(this.department.slice(0,4) === "품질검증"){
                this.isSuwon = true;
            }else{
                this.isSuwon = false;    
            }
        },
        
        initToday : function(todayStr, holidayData){
            this.year = Moment(todayStr, DATETIMEFORMAT);
            this.year = this.year.year();
            this.date = todayStr;
            this.standardInTime = null;
            this.standardOutTime = null;
            this.earliestTime = null;
            this.inTime = null;
            this.inTimeType = 1;
            this.outTime = null;
            this.outTimeType = 1;
            this.latestTime = null;
            this.lateTime = 0;
            this.lateTimeOver = 0;
            this.overTime = 0;
            this.workType = WORKTYPE.NORMAL;
            this.vacationCode= null;
            this.outOfficeCode= null;
            this.overtimeCode = null;
            this.holidayData = holidayData;
            this.outOfficeStartTime = null;
            this.outOfficeEndTime = null;
            this.inTimeChange = 0;
            this.outTimeChange = 0;
            this.overtimeCodeChange = 0;
            this.checkInOffice = false;
            this.checkLate = true;
            this.checkEarly =true;
            this.earlyTime = 0;
            this.notPayOverTime =0;
        },
        
        initByModel : function(model){
            this.id = model.get("id");
            this.name = model.get("name");
            this.department = model.get("department");
            this.year = model.get("year");
            this.date = model.get("date");
            this.standardInTime = _.isNull(model.get("standard_in_time")) ? null : Moment(model.get("standard_in_time"));
            this.standardOutTime = _.isNull(model.get("standard_out_time")) ? null : Moment(model.get("standard_out_time"));
            this.inTime = _.isNull(model.get("in_time")) ? null : Moment(model.get("in_time"));
            this.outTime = _.isNull(model.get("out_time")) ? null : Moment(model.get("out_time"));
            this.inTimeType = model.get("in_time_type");
            this.outTimeType = model.get("out_time_type");
            this.lateTime = model.get("late_time");
            this.holidayWorkTime = model.get("holidayWorkTime");
            this.lateTimeOver = model.get("lateTimeOver");
            this.overTime = model.get("over_time");
            this.workType = model.get("work_type");
            this.vacationCode= model.get("vacation_code");
            this.outOfficeCode= model.get("out_office_code");
            this.overtimeCode = model.get("overtime_code");
            this.outOfficeStartTime = model.get("out_office_start_time");
            this.outOfficeEndTime = model.get("out_office_end_time");
            this.inTimeChange = model.get("in_time_change");
            this.outTimeChange = model.get("out_time_change");
            this.overtimeCodeChange = model.get("overtime_code_change");
            this.checkLate = true;
            this.checkEarly =true;
            this.earlyTime = model.get("early_time");
            this.notPayOverTime =model.get("not_pay_over_time");
            if(this.department.slice(0,4) === "품질검증"){
                this.isSuwon = true;
            }else{
                this.isSuwon = false;    
            }
            
            if(this.workType == WORKTYPE.HOLIDAYWORK){
                this.checkInOffice = true;
            }else{
                this.checkInOffice = false;
            }
        },
        
        setHoliday : function(){    // 오늘이 휴일인지 여부 판단
            var today = Moment(this.date);
            if(this.holidayData.length > 0 || today.day() === 0 || today.day() === 6){ // 휴일일 경우 work_type 바꿈
                this.workType = WORKTYPE.HOLIDAY;
            }
        },
        
        checkTime : function(rawDataCollection){
            var that = this;
            
            var setEarliestTime = function(destTime){
                if(_.isNull(that.earliestTime))
                    that.earliestTime = destTime;
                else
                    if(that.earliestTime.isAfter(destTime))
                        that.earliestTime = destTime;
            };
            
            var setInTime = function(destTime){
                if(_.isNull(that.inTime))
                    that.inTime = destTime;
                else
                    if(that.inTime.isAfter(destTime))
                        that.inTime = destTime;
            };
            
            var setOutTime = function(destTime){
                if(_.isNull(that.outTime))
                    that.outTime = destTime;
                else
                    if(that.outTime.isBefore(destTime))
                        that.outTime = destTime;
            };
            
            var setLatestTime = function(destTime){
                if(_.isNull(that.latestTime))
                    that.latestTime = destTime;
                else
                    if(that.latestTime.isBefore(destTime))
                        that.latestTime = destTime;
            };
            
            _.each(rawDataCollection, function(rawDataModel){
                if(rawDataModel.get("need_confirm") == 1){
                    var destTime = Moment(rawDataModel.get("char_date"));
                    var type  = rawDataModel.get("type");
                    type = type.slice(0,2);
                    
                    if(type == "출근" && this.date == destTime.format(DATEFORMAT)){ // 출근 기록일 경우
                        setInTime(destTime);
                        setEarliestTime(destTime);
                    }else if(type == "퇴근"){ // 퇴근기록일 경우
                        setOutTime(destTime);
                        setLatestTime(destTime);
                    }else{
                        if(type == "외출"){
                            this.outOfficeStartTime = destTime;
                        }else if(type == "복귀"){
                            this.outOfficeEndTime = destTime;
                        }
                        
                        // 출퇴근 기록이 없을때를 대비해서 이른시간 / 늦은시간을 구한다.
                        setEarliestTime(destTime);
                        setLatestTime(destTime);
                    }
                }
            });
            
            this.setTimeType();
        },
            
        setTimeType : function(){
            if(!this.inTime){ // 출근기록이 없을경우
                if(this.earliestTime){
                    this.inTime = this.earliestTime;   // 저장된 가장 이른 출입시간을 출근시간으로 표시
                }
                 // 출근기록 없다는것 표시
                 if(this.workType != "30")
                    this.inTimeType = 2;              
            }else{
                this.inTimeType = 1;              
            }
            
            if(!this.outTime){// 퇴근 기록이 없는경우
                if(this.latestTime){
                    this.outTime = this.latestTime;// 저장된 가장 늦은 출입시간을 퇴근시간으로 표시
                }
                if(this.workType != "30")
                    this.outTimeType = 2;          
            }else{
                this.outTimeType = 1;              
            }
        },
        
        setStandardTime : function(yesterdayOutTime){
            if(this.workType != WORKTYPE.HOLIDAY || this.workType != WORKTYPE.HOLIDAYWORK){
                if(this.isSuwon){
                    var isFlexable = true;
                    var morningWorkTime = 4;
                    var eveningWorkTime = 4;
                    var dayWorkTime = 9;
                    this.standardInTime = Moment(this.date, DATEFORMAT).hour(10).minute(0).second(0);
                    this.standardOutTime = Moment(this.date, DATEFORMAT).hour(19).minute(0).second(0);     
                    
                    if(!_.isNull(yesterdayOutTime) && !_.isUndefined(yesterdayOutTime)){
                        if(yesterdayOutTime.format(DATEFORMAT) == this.date){ // 전일 퇴근시간에 따른 다음날 출근 기준시간.
                            var suOutTimeHour = yesterdayOutTime.hour();
                            if (suOutTimeHour >= 3){ // 3시 이후 퇴근
                                this.standardInTime.hour(14).minute(0).second(0);
                                this.standardOutTime.hour(18).minute(0).second(0);
                                morningWorkTime -= 4;
                                dayWorkTime -= 5;
                                isFlexable = false;
                            } else if (suOutTimeHour >= 2){ // 2시 이후 퇴근
                                this.standardInTime.hour(12).minute(0).second(0);
                                this.standardOutTime.hour(18).minute(0).second(0);
                                morningWorkTime -= 2;
                                dayWorkTime -= 3;
                                isFlexable = false;
                            } else if (suOutTimeHour >= 1){ // 1시 이후 퇴근
                                this.standardInTime.hour(11).minute(0).second(0); 
                                this.standardOutTime.hour(18).minute(0).second(0);
                                morningWorkTime -= 1;
                                dayWorkTime -= 2;
                                isFlexable = false;
                            }
                            
                            if (outTimeHour >= 10){
                                this.checkLate = false;
                                this.checkEarly = false;
                                return;
                            }
                        }
                    }
                    if(this.vacationCode == "V02"){
                        this.standardInTime.hour(14).minute(0).second(0);
                        this.standardOutTime = Moment(this.standardInTime).add(eveningWorkTime,"hours");
                    }else if(this.vacationCode == "V03"){
                        if(!_.isNull(this.inTime)){
                            if((this.inTime.isBefore(this.standardInTime) || this.inTime.isSame(this.standardInTime)) && isFlexable) // 지각기준보다 일찍왔을경우 기준시간 변경
                                this.standardInTime = Moment(this.inTime);
                        }
                        this.standardOutTime = Moment(this.standardInTime).add(morningWorkTime,"hours");
                    }else{
                        if(!_.isNull(this.inTime)){
                            if((this.inTime.isBefore(this.standardInTime) || this.inTime.isSame(this.standardInTime)) && isFlexable){ // 지각기준보다 일찍왔을경우 기준시간 변경
                                if(this.inTime.hour() < 7){
                                    this.standardInTime.hour(7).minute(0).second(0);
                                }else{
                                    this.standardInTime = Moment(this.inTime);
                                }
                            }
                        }
                        this.standardOutTime = Moment(this.standardInTime).add(dayWorkTime,"hours");
                    }
                    
                }else{ // 본사 기준 StandardTime 설정
                    this.standardInTime = Moment(this.date, DATEFORMAT).hour(9).minute(0).second(0);
                    this.standardOutTime = Moment(this.date, DATEFORMAT).hour(18).minute(0).second(0);
                    if(!_.isNull(yesterdayOutTime)){
                        if(yesterdayOutTime.format(DATEFORMAT) == this.date){
                            var outTimeHour = yesterdayOutTime.hour();
                            if (outTimeHour >= 3){
                                this.standardInTime.hour(13).minute(20).second(0); // 3시 이후 퇴근
                            } else if(outTimeHour >= 2){
                                this.standardInTime.hour(11).minute(0).second(0);  //
                            } else if(outTimeHour >= 1){
                                this.standardInTime.hour(10).minute(0).second(0);
                            }   
                            if(outTimeHour >= 10){
                                this.checkLate = false;
                                this.checkEarly = false;
                                return;
                            }
                        }
                    }
                    switch(this.vacationCode){
                        case "V02": // 오전반차
                            this.standardInTime.hour(13).minute(20).second(0);
                            break;
                        case "V03": // 오후반차
                            this.standardOutTime.hour(12).minute(20).second(0);
                            break;
                    }
                }
            }
        },
        
        
        setInOffice : function(todayInOffice){ // 휴일근무 여부 판단 (checkInOffice)
            if(this.workType == WORKTYPE.HOLIDAY || this.workType == WORKTYPE._HOLIDAYWORK || this.workType.HOLIDAY){  // 휴일중 근무에 대해서만 체크
                this.workType = WORKTYPE.HOLIDAY;
                if(todayInOffice.length > 0){ // 휴일근무 결재가 된 상태일때만 휴일근무 계산 로직에 들어감
                    this.checkInOffice = true;
                }else{
                    this.checkInOffice = false;
                }
            }
        },
        
         
        setOutOffice : function(todayOutOffice){ // 오늘의 vacationCode, outOfficeCode 설정
            if(todayOutOffice.length > 0){
                for (var i = 0; i <todayOutOffice.length; i++){
                    var model = todayOutOffice[i];
                    var code = model.get("office_code");
                    var VACATION_CODES = ["V01","V02","V03","V04","V05","V06"];
                    var OUTOFFICE_CODES = ["W01","W02"];

                    if(_.indexOf(VACATION_CODES, code) >= 0){
                        this.vacationCode = code;
                        switch(code){
                            case "V01": // 연차휴가
                            case "V04": // 경조휴가
                            case "V05": // 공적휴가
                            case "V06": // 특별휴가
                                this.workType = WORKTYPE.VACATION;
                                break;
                        }
                    }
                    
                    if(_.indexOf(OUTOFFICE_CODES, code) >= 0){
                        this.outOfficeCode = code;
                        switch(code){
                            case "W01": // 외근
                                var startTime = Moment(model.get("start_time"), "HH:mm");
                                var endTime = Moment(model.get("end_time"), "HH:mm");
                                if(startTime.isBefore(this.standardInTime) || startTime.isSame(this.standardInTime))
                                    this.checkLate = false;
                                if(endTime.isAfter(this.standardOutTime) || endTime.isSame(this.standardOutTime))
                                    this.checkEarly = false;
                                break;
                            case "W02": // 출장
                                this.checkLate = false;
                                this.checkEarly = false;
                                break;
                        }
                    }
                }
            }
        },
        
        
        getResult : function(){
            // 출퇴근시간 판단
            
            
            if(!(this.workType == WORKTYPE.VACATION || this.workType==WORKTYPE.HOLIDAY ||this.workType == WORKTYPE.HOLIDAYWORK || this.workType == WORKTYPE._HOLIDAYWORK)){ // 휴일 / 휴가가 아닌경우
                if(!this.inTime && !this.outTime && this.checkLate && this.checkEarly){ // 출퇴근 기록이 없으면 결근
                    if(this.outOfficeCode!="W02"){ // 출장 체크
                        this.workType = WORKTYPE.ABSENTCE;
                    }
                }else if(!this.inTime && this.checkLate){
                    this.workType = WORKTYPE.NOTINTIME;
                }else if(!this.outTime && this.checkEarly){
                    this.workType = WORKTYPE.NOTOUTTIME;
                }else{
                    this.setLateTime();
                    this.setOverTimeCode();
                    this.setEarlyTime();
                    this.setNotPayOverTime(false);
                }    
            }else{
                if(this.workType != WORKTYPE.VACATION){ // 휴일일 경우만 휴일 초과근무를 계산한다.
                    this.setHolidayWorkTimeCode();
                    this.setNotPayOverTime(true);
                }
            }
           
            return {
                id : this.id,
                name : this.name,
                department : this.department,
                year : this.year,
                date : this.date,
                work_type : this.workType,
                standard_in_time : _.isNull(this.standardInTime) ? null : this.standardInTime.format(DATETIMEFORMAT),
                standard_out_time :_.isNull(this.standardOutTime) ? null : this.standardOutTime.format(DATETIMEFORMAT),
                in_time : _.isNull(this.inTime) ? null : this.inTime.format(DATETIMEFORMAT),
                out_time : _.isNull(this.outTime) ? null : this.outTime.format(DATETIMEFORMAT),
                in_time_type : this.inTimeType,
                out_time_type: this.outTimeType,
                late_time : this.lateTime,
                over_time : this.overTime,
                vacation_code : this.vacationCode,
                overtime_code : this.overtimeCode,
                out_office_code : this.outOfficeCode,
                out_office_start_time : _.isNull(this.outOfficeStartTime) ? null : Moment(this.outOfficeStartTime).format(DATETIMEFORMAT),
                out_office_end_time : _.isNull(this.outOfficeEndTime) ? null : Moment(this.outOfficeEndTime).format(DATETIMEFORMAT),
                in_time_change : this.inTimeChange,
                out_time_change : this.outTimeChange,
                overtime_code_change : this.overtimeCodeChange,
                early_time : this.earlyTime,
                not_pay_over_time : this.notPayOverTime,
            };
        },
        
        
        setLateTime : function(){
            if(this.workType != WORKTYPE.VACATION && this.outOfficeCode != "W02"){
                if(this.checkLate){
                    this.lateTime = this.inTime.diff(this.standardInTime,"minute");
                    this.workType = WORKTYPE.NORMAL;
                    if(this.lateTime > 0 ){
                        this.workType = WORKTYPE.LATE;  // 지각
                    }else{
                        this.lateTime = 0;
                    }
                }else{
                    this.workType = WORKTYPE.NORMAL;
                    this.lateTime = 0;
                }
            }
        },
        
        setHolidayWorkTimeCode : function(){ // 휴일 출퇴근 기록이 있을때 실행한다.
            if(!_.isNull(this.inTime) && !_.isNull(this.outTime)){
                this.overTime = this.outTime.diff(this.inTime,"minute"); // 휴일근무 시간
                if(this.checkInOffice){ 
                    if(this.overtimeCodeChange == 0){ // 초과근무 코드 변경내역이 있으면 초과코드는 변경하지 않는다.
                        if (this.overTime >= 480)
                            this.overtimeCode =  "2015_BC";
                        else if (this.overTime >= 360)
                            this.overtimeCode =  "2015_BB";
                        else if (this.overTime >= 240)
                            this.overtimeCode =  "2015_BA";
                    }
                    this.workType = WORKTYPE.HOLIDAYWORK;
                }else{
                    this.workType = WORKTYPE._HOLIDAYWORK;
                }
            }
        },
        
        setOverTimeCode : function(){ // 평일 초과근무 계산
            var isEarly = false;
            if(!(_.isNull(this.outTime)) && !(_.isNull(this.standardOutTime))){
                this.lateOverTime = (Math.ceil(this.lateTime/10)) * 10; // 지각으로 인해 추가 근무 해야하는시간 (millisecond)
                                                        
                if(this.outTime.diff(this.standardOutTime,"minute") >= 0) {
                    this.overTime = this.outTime.diff(this.standardOutTime,"minute") - this.lateOverTime; // 초과근무 시간 (지각시간 제외)
                    if((this.vacationCode === null || this.vacationCode === "V02") && this.overtimeCodeChange == 0){  // 초과근무 코드 변경내역이 있으면 초과코드는 변경하지 않는다.
                        if(this.overTime >= 360){
                            this.overtimeCode = "2015_AC";
                        } else if(this.overTime >= 240){
                            this.overtimeCode = "2015_AB";   
                        } else if(this.overTime >= 120){
                            this.overtimeCode = "2015_AA";   
                        } else {
                            this.overtimeCode = null;
                        }
                    }
                    if(this.overTime < 0){
                        this.overTime = 0; // 초과근무시간이 마이너스인 경우 0으로 수정함
                    }       
                } else {
                    isEarly = true;
                }
                
                    
            }

            if(this.checkEarly && isEarly){
                if (this.workType == WORKTYPE.LATE)
                    this.workType = WORKTYPE.EARLY_LATE;
                else
                    this.workType = WORKTYPE.EARLY;
            }
        },
        
        setEarlyTime : function(){
            if(!_.isNull(this.inTime) && !_.isNull(this.standardInTime)){
                this.earlyTime = this.standardInTime.diff(this.inTime, "minute");
                if(this.earlyTime <= 0)     this.earlyTime = 0;
            }
        },
        
        setNotPayOverTime : function(isHoliday){
            if(!_.isNull(this.overTime) && !_.isUndefined(isHoliday)){
                if(isHoliday){
                    this.notPayOverTime = this.overTime - 480;   
                }else{
                    this.notPayOverTime = this.overTime - 360;   
                }
                
                if(this.notPayOverTime <= 0)    this.notPayOverTime =0;
            }
        },
        
        /***************************************************
        // destCollection (length = 3[yesterday, today, tomorrow])
        // inData{ changeInTime, changeOutTime }
        // return resultCommuteCollection(today,tomorrow);
        ****************************************************/
        modifyByCollection: function(destCommuteCollection, inData, changeHistoryCollection){
            var dfd = new $.Deferred();
            var resultCommuteCollection = new CommuteCollection();
		    
		    var yesterdayCommute = destCommuteCollection.models[0];
 			var currentDayCommute = destCommuteCollection.models[1];
 			
 			this.initByModel(currentDayCommute);
 			
 			if(!_.isNull(inData.changeInTime)){
 				this.inTime = Moment(inData.changeInTime);
 				this.inTimeChange += 1; 
 			}
 			
 			if(!_.isNull(inData.changeOutTime)){
 				this.outTime = Moment(inData.changeOutTime);
 				this.outTimeChange += 1;
 			}
            var yesterdayOutTime = yesterdayCommute.get("out_time");
 			this.setStandardTime(_.isNull(yesterdayOutTime)? null : Moment(yesterdayOutTime, this.DATETIMEFORMAT));
 			
 			var currentResult = this.getResult();
 			
 			if(!_.isNull(inData.changeOvertimeCode)){
 			    currentResult.overtime_code = inData.changeOvertimeCode;
 				currentResult.overtime_code_change += 1;
 			}
 			
 			resultCommuteCollection.add(currentResult);
            if(destCommuteCollection.length == 3){
                var nextDayCommute = destCommuteCollection.models[2];		
     			this.initByModel(nextDayCommute);
     			
     			if(currentResult.out_time){
                	this.setStandardTime(Moment(currentResult.out_time), this.DATETIMEFORMAT);
     			}
                var yesterdayResult = this.getResult();
                
    			resultCommuteCollection.add(yesterdayResult);    
            }
 			
			resultCommuteCollection.save({
			    success : function(){
			        dfd.resolve(resultCommuteCollection);
			    }, error: function(){
			        dfd.reject();
			    }
			}, currentResult.id, changeHistoryCollection);
			return dfd.promise();
        },
        
        modifyByInOutOfficeType : function(date, id, type, model){
            
            var dfd = new $.Deferred();
            var that = this;
            var commuteCollection = new CommuteCollection();
            
     		commuteCollection.fetchDate(date).then(function(result){
         		var currentDayCommute = commuteCollection.where({id : id});
         		if(currentDayCommute.length > 0){
         		    currentDayCommute = currentDayCommute[0];
         		}else {
         		    dfd.reject({msg : "Fail to fetch commuteCollection"});
         		    return;
         		}
         		
         		that.initByModel(currentDayCommute);
         		
         		if(type == "in"){
         		    var inOfficeCollection = new InOfficeCollection();
         		    inOfficeCollection.add(model);
         		    that.setInOffice(inOfficeCollection);
         		}else if(type == "out"){
         		    model.date = date;
         		    var outOfficeCollection = new OutOfficeCollection();
         		    outOfficeCollection.add(model);
         		    that.setOutOffice(outOfficeCollection.where({date: that.date}));
         		}else{
         		    dfd.reject({msg : "Wrong type (in /out)"});
         		}    
         		
         		dfd.resolve(that.getResult());
            },function(){
                dfd.reject();
            });
            
            return dfd.promise();
        }
    };
    
    return {
        TIMEFORMAT : TIMEFORMAT,
        DATEFORMAT : DATEFORMAT,
        DATETIMEFORMAT : DATETIMEFORMAT,
        WORKTYPE : WORKTYPE,
        Builder : Builder
    };  
});