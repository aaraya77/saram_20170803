{"filter":false,"title":"Holiday.js","tooltip":"/service/Holiday.js","undoManager":{"mark":100,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":20,"column":11},"end":{"row":20,"column":12},"action":"insert","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":11},"end":{"row":20,"column":12},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":12},"end":{"row":20,"column":13},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":13},"end":{"row":20,"column":14},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":14},"end":{"row":20,"column":15},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":15},"end":{"row":20,"column":16},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":16},"end":{"row":20,"column":17},"action":"insert","lines":["D"]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":17},"end":{"row":20,"column":18},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":18},"end":{"row":20,"column":19},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":19},"end":{"row":20,"column":20},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":20},"end":{"row":20,"column":21},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":21},"end":{"row":20,"column":22},"action":"insert","lines":[":"]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":22},"end":{"row":20,"column":23},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":24},"end":{"row":20,"column":25},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":25},"end":{"row":20,"column":26},"action":"insert","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":20,"column":26},"end":{"row":20,"column":27},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":10,"column":4},"end":{"row":10,"column":39},"action":"remove","lines":["debug(\"lunarDate : \" + _data.date);"]}]}],[{"group":"doc","deltas":[{"start":{"row":11,"column":20},"end":{"row":12,"column":0},"action":"insert","lines":["",""]},{"start":{"row":12,"column":0},"end":{"row":12,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":8},"end":{"row":12,"column":43},"action":"insert","lines":["debug(\"lunarDate : \" + _data.date);"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":43},"end":{"row":13,"column":0},"action":"insert","lines":["",""]},{"start":{"row":13,"column":0},"end":{"row":13,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":34,"column":8},"end":{"row":34,"column":22},"action":"remove","lines":["getHolidayList"]},{"start":{"row":34,"column":8},"end":{"row":34,"column":22},"action":"insert","lines":["getHolidayList"]}]}],[{"group":"doc","deltas":[{"start":{"row":34,"column":25},"end":{"row":34,"column":40},"action":"remove","lines":["_getHolidayList"]},{"start":{"row":34,"column":25},"end":{"row":34,"column":40},"action":"insert","lines":["_getHolidayList"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":44},"end":{"row":25,"column":54},"action":"remove","lines":["_data.year"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":26},"end":{"row":25,"column":43},"action":"remove","lines":["selectHolidayList"]},{"start":{"row":25,"column":26},"end":{"row":25,"column":43},"action":"insert","lines":["selectHolidayList"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":3,"column":0},"action":"insert","lines":["// Author: sanghee park <novles@naver.com>","// Create Date: 2014.12.18","// 사용자 Service",""]},{"start":{"row":6,"column":4},"end":{"row":7,"column":4},"action":"remove","lines":["LunarCalendar = require(\"lunar-calendar\");","var "]},{"start":{"row":6,"column":7},"end":{"row":6,"column":8},"action":"remove","lines":["i"]},{"start":{"row":6,"column":8},"end":{"row":6,"column":9},"action":"insert","lines":["i"]},{"start":{"row":9,"column":9},"end":{"row":26,"column":9},"action":"remove","lines":["data = data;","    ","    _data.date = _data.year + \"-\" + _data.date;","    ","    if(_data.lunar){","        debug(\"lunarDate : \" + _data.date);","        ","        var date = new Date(_data.date);","        var solarDate = LunarCalendar.lunarToSolar(date.getFullYear(), date.getMonth()+1, date.getDate());","        _data.date = solarDate.year + \"-\"","        + (solarDate.month <10 ? \"0\" + solarDate.month : solarDate.month) + \"-\"","        + (solarDate.day <10 ? \"0\" + solarDate.day : solarDate.day)","        _data.year = solarDate.year;","    }","    ","    debug(\"solarDate : \" + _data.date);","    ","    var _"]},{"start":{"row":10,"column":18},"end":{"row":10,"column":19},"action":"remove","lines":["i"]},{"start":{"row":10,"column":19},"end":{"row":10,"column":20},"action":"insert","lines":["i"]},{"start":{"row":10,"column":44},"end":{"row":13,"column":19},"action":"remove","lines":[");","    }","    ","    var _insertHoli"]},{"start":{"row":10,"column":46},"end":{"row":10,"column":54},"action":"remove","lines":["y = func"]},{"start":{"row":10,"column":47},"end":{"row":11,"column":20},"action":"remove","lines":["ion(){","        return Holid"]},{"start":{"row":10,"column":48},"end":{"row":10,"column":49},"action":"insert","lines":["."]},{"start":{"row":10,"column":50},"end":{"row":10,"column":51},"action":"remove","lines":["D"]},{"start":{"row":10,"column":50},"end":{"row":10,"column":51},"action":"insert","lines":["e"]},{"start":{"row":10,"column":52},"end":{"row":10,"column":58},"action":"remove","lines":["o.inse"]},{"start":{"row":10,"column":53},"end":{"row":10,"column":67},"action":"remove","lines":["tHoliday(_data"]},{"start":{"row":14,"column":8},"end":{"row":15,"column":8},"action":"remove","lines":["data : _data,","        "]},{"start":{"row":14,"column":22},"end":{"row":14,"column":23},"action":"remove","lines":[" "]},{"start":{"row":14,"column":23},"end":{"row":14,"column":24},"action":"remove","lines":[" "]},{"start":{"row":14,"column":38},"end":{"row":14,"column":39},"action":"remove","lines":[","]},{"start":{"row":15,"column":4},"end":{"row":15,"column":9},"action":"remove","lines":["    i"]},{"start":{"row":15,"column":4},"end":{"row":18,"column":2},"action":"insert","lines":["}","}","","//"]},{"start":{"row":18,"column":3},"end":{"row":18,"column":4},"action":"remove","lines":["s"]},{"start":{"row":18,"column":4},"end":{"row":18,"column":13},"action":"remove","lines":["rtHoliday"]},{"start":{"row":18,"column":4},"end":{"row":18,"column":5},"action":"insert","lines":["w"]},{"start":{"row":18,"column":6},"end":{"row":18,"column":20},"action":"remove","lines":[": _insertHolid"]},{"start":{"row":18,"column":7},"end":{"row":18,"column":8},"action":"remove","lines":["y"]},{"start":{"row":18,"column":7},"end":{"row":18,"column":9},"action":"insert","lines":["pp"]},{"start":{"row":18,"column":10},"end":{"row":19,"column":0},"action":"remove","lines":["",""]},{"start":{"row":18,"column":10},"end":{"row":18,"column":11},"action":"insert","lines":["은"]},{"start":{"row":18,"column":12},"end":{"row":18,"column":15},"action":"insert","lines":["싱글톤"]},{"start":{"row":18,"column":16},"end":{"row":18,"column":19},"action":"insert","lines":["아니고"]},{"start":{"row":18,"column":20},"end":{"row":18,"column":24},"action":"insert","lines":["app은"]},{"start":{"row":18,"column":25},"end":{"row":20,"column":0},"action":"remove","lines":["}","}",""]},{"start":{"row":18,"column":25},"end":{"row":18,"column":30},"action":"insert","lines":["계속 생성"]},{"start":{"row":0,"column":0},"end":{"row":3,"column":0},"action":"remove","lines":["// Author: sanghee park <novles@naver.com>","// Create Date: 2014.12.18","// 사용자 Service",""]},{"start":{"row":3,"column":4},"end":{"row":4,"column":4},"action":"insert","lines":["LunarCalendar = require(\"lunar-calendar\");","var "]},{"start":{"row":4,"column":7},"end":{"row":4,"column":8},"action":"remove","lines":["d"]},{"start":{"row":4,"column":8},"end":{"row":4,"column":9},"action":"insert","lines":["d"]},{"start":{"row":7,"column":9},"end":{"row":24,"column":9},"action":"insert","lines":["data = data;","    ","    _data.date = _data.year + \"-\" + _data.date;","    ","    if(_data.lunar){","        debug(\"lunarDate : \" + _data.date);","        ","        var date = new Date(_data.date);","        var solarDate = LunarCalendar.lunarToSolar(date.getFullYear(), date.getMonth()+1, date.getDate());","        _data.date = solarDate.year + \"-\"","        + (solarDate.month <10 ? \"0\" + solarDate.month : solarDate.month) + \"-\"","        + (solarDate.day <10 ? \"0\" + solarDate.day : solarDate.day)","        _data.year = solarDate.year;","    }","    ","    debug(\"solarDate : \" + _data.date);","    ","    var _"]},{"start":{"row":25,"column":18},"end":{"row":25,"column":19},"action":"remove","lines":["d"]},{"start":{"row":25,"column":19},"end":{"row":25,"column":20},"action":"insert","lines":["d"]},{"start":{"row":25,"column":44},"end":{"row":28,"column":19},"action":"insert","lines":[");","    }","    ","    var _insertHoli"]},{"start":{"row":28,"column":21},"end":{"row":28,"column":29},"action":"insert","lines":["y = func"]},{"start":{"row":28,"column":30},"end":{"row":29,"column":20},"action":"insert","lines":["ion(){","        return Holid"]},{"start":{"row":29,"column":21},"end":{"row":29,"column":25},"action":"insert","lines":["yDao"]},{"start":{"row":29,"column":26},"end":{"row":29,"column":38},"action":"insert","lines":["insertHolida"]},{"start":{"row":29,"column":39},"end":{"row":29,"column":40},"action":"remove","lines":["e"]},{"start":{"row":29,"column":39},"end":{"row":29,"column":44},"action":"insert","lines":["(_dat"]},{"start":{"row":29,"column":45},"end":{"row":29,"column":46},"action":"remove","lines":["r"]},{"start":{"row":33,"column":8},"end":{"row":34,"column":8},"action":"insert","lines":["data : _data,","        "]},{"start":{"row":34,"column":22},"end":{"row":34,"column":23},"action":"insert","lines":[" "]},{"start":{"row":34,"column":24},"end":{"row":34,"column":25},"action":"insert","lines":[" "]},{"start":{"row":34,"column":40},"end":{"row":34,"column":41},"action":"insert","lines":[","]},{"start":{"row":35,"column":4},"end":{"row":38,"column":2},"action":"remove","lines":["}","}","","//"]},{"start":{"row":35,"column":4},"end":{"row":35,"column":9},"action":"insert","lines":["    i"]},{"start":{"row":35,"column":10},"end":{"row":35,"column":11},"action":"insert","lines":["s"]},{"start":{"row":35,"column":12},"end":{"row":35,"column":14},"action":"remove","lines":["w "]},{"start":{"row":35,"column":12},"end":{"row":35,"column":19},"action":"insert","lines":["rtHolid"]},{"start":{"row":35,"column":20},"end":{"row":35,"column":22},"action":"remove","lines":["pp"]},{"start":{"row":35,"column":20},"end":{"row":35,"column":21},"action":"insert","lines":["y"]},{"start":{"row":35,"column":22},"end":{"row":35,"column":23},"action":"remove","lines":["은"]},{"start":{"row":35,"column":22},"end":{"row":35,"column":23},"action":"insert","lines":[":"]},{"start":{"row":35,"column":24},"end":{"row":35,"column":27},"action":"remove","lines":["싱글톤"]},{"start":{"row":35,"column":24},"end":{"row":35,"column":38},"action":"insert","lines":["_insertHoliday"]},{"start":{"row":35,"column":39},"end":{"row":35,"column":42},"action":"remove","lines":["아니고"]},{"start":{"row":35,"column":39},"end":{"row":36,"column":1},"action":"insert","lines":[""," "]},{"start":{"row":36,"column":2},"end":{"row":36,"column":6},"action":"remove","lines":["app은"]},{"start":{"row":36,"column":3},"end":{"row":36,"column":5},"action":"remove","lines":["계속"]},{"start":{"row":36,"column":4},"end":{"row":36,"column":6},"action":"remove","lines":["생성"]},{"start":{"row":36,"column":4},"end":{"row":38,"column":0},"action":"insert","lines":["}","}",""]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":8},"end":{"row":12,"column":9},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":9},"end":{"row":12,"column":10},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":4},"end":{"row":22,"column":5},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":5},"end":{"row":22,"column":6},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":21},"end":{"row":19,"column":22},"action":"insert","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":22},"end":{"row":19,"column":23},"action":"insert","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":23},"end":{"row":19,"column":24},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":24},"end":{"row":19,"column":25},"action":"insert","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":25},"end":{"row":19,"column":26},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":44},"end":{"row":25,"column":45},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":45},"end":{"row":25,"column":46},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":46},"end":{"row":25,"column":47},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":47},"end":{"row":25,"column":48},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":48},"end":{"row":25,"column":49},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":49},"end":{"row":25,"column":50},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":50},"end":{"row":25,"column":51},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":51},"end":{"row":25,"column":52},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":52},"end":{"row":25,"column":53},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":53},"end":{"row":25,"column":54},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":24,"column":53},"end":{"row":25,"column":0},"action":"insert","lines":["",""]},{"start":{"row":25,"column":0},"end":{"row":25,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":4},"end":{"row":25,"column":5},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":4},"end":{"row":25,"column":5},"action":"remove","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":4},"end":{"row":25,"column":8},"action":"insert","lines":["data"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":8},"end":{"row":25,"column":9},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":9},"end":{"row":25,"column":10},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":9},"end":{"row":25,"column":10},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":8},"end":{"row":25,"column":9},"action":"remove","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":7},"end":{"row":25,"column":8},"action":"remove","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":6},"end":{"row":25,"column":7},"action":"remove","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":5},"end":{"row":25,"column":6},"action":"remove","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":4},"end":{"row":25,"column":5},"action":"remove","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":4},"end":{"row":25,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":8},"end":{"row":25,"column":9},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":9},"end":{"row":25,"column":10},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":10},"end":{"row":25,"column":11},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":11},"end":{"row":25,"column":12},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":12},"end":{"row":25,"column":13},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":13},"end":{"row":25,"column":15},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":14},"end":{"row":25,"column":15},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":15},"end":{"row":25,"column":16},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":16},"end":{"row":25,"column":17},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":17},"end":{"row":25,"column":18},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":18},"end":{"row":25,"column":19},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":19},"end":{"row":25,"column":20},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":20},"end":{"row":25,"column":21},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":21},"end":{"row":25,"column":22},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":22},"end":{"row":25,"column":23},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":23},"end":{"row":25,"column":24},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":25},"end":{"row":25,"column":26},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":8},"end":{"row":25,"column":26},"action":"remove","lines":["debug(_data.year);"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":0},"end":{"row":25,"column":8},"action":"remove","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":26},"end":{"row":25,"column":43},"action":"remove","lines":["selectHolidayList"]},{"start":{"row":25,"column":26},"end":{"row":25,"column":43},"action":"insert","lines":["selectHolidayList"]}]}],[{"group":"doc","deltas":[{"start":{"row":24,"column":53},"end":{"row":25,"column":0},"action":"insert","lines":["",""]},{"start":{"row":25,"column":0},"end":{"row":25,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":4},"end":{"row":25,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":8},"end":{"row":25,"column":9},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":9},"end":{"row":25,"column":10},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":10},"end":{"row":25,"column":11},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":11},"end":{"row":25,"column":12},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":12},"end":{"row":25,"column":13},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":13},"end":{"row":25,"column":15},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":14},"end":{"row":25,"column":15},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":14},"end":{"row":25,"column":15},"action":"remove","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":14},"end":{"row":25,"column":15},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":15},"end":{"row":25,"column":16},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":16},"end":{"row":25,"column":17},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":17},"end":{"row":25,"column":18},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":18},"end":{"row":25,"column":19},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":19},"end":{"row":25,"column":20},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":20},"end":{"row":25,"column":21},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":21},"end":{"row":25,"column":22},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":22},"end":{"row":25,"column":23},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":23},"end":{"row":25,"column":24},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":25},"end":{"row":25,"column":26},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":0},"end":{"row":2,"column":39},"action":"remove","lines":["var Schemas = require(\"../schemas.js\");"]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":0},"end":{"row":3,"column":0},"action":"remove","lines":["",""]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":27,"column":4},"end":{"row":27,"column":4},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":11,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1420707049147,"hash":"5d744eb1f0d11ff703e265eed88b342b30f6572a"}