if (!("remove" in Array.prototype)) {
	Array.prototype.remove = function(s){
		var len = this.length;
		while(len--){
			if (s == this[len]){
				this.splice(len, 1);
			}
		}
		return this;
	};
}
if (!("contains" in Array.prototype)) {
  Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
      if (this[i] === obj) {
        return true;
      }
    }
    return false;
  }
}

if (!("contains" in String.prototype)) {
	String.prototype.contains = function(str, startIndex){
		return this.indexOf(str, startIndex) >= 0;
	};
}
if (!("startsWith" in String.prototype)) {
  String.prototype.startsWith = function(str, startIndex){
    return this.indexOf(str, startIndex) == 0;
  };
}
if (!("endsWith" in String.prototype)) {
  String.prototype.endsWith = function(str, startIndex){
    return this.indexOf(str, this.length - str.length) !== -1;
  };
}

Date.prototype.format = function(fmt) {
  var str = fmt; 
  //var Week = ['日','一','二','三','四','五','六']; 

  str=str.replace(/yyyy|YYYY/,this.getFullYear()); 
  str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));
  str=str.replace(/MM/,this.getMonth()>=9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));
  str=str.replace(/M/g,this.getMonth()+1); 
  //str=str.replace(/w|W/g,Week[this.getDay()]); 
  str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
  str=str.replace(/d|D/g,this.getDate()); 
  str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
  str=str.replace(/h|H/g,this.getHours()); 
  str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
  str=str.replace(/m/g,this.getMinutes()); 
  str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
  str=str.replace(/s|S/g,this.getSeconds()); 

  return str;  
};

var CommonUtils = {
	ajax: {
		callCommon: function(url, param, callBack, failCallBack, dataType){
			$.ajax({
				async: true,
				url : url,
				method : "POST",
				data: param,
				dataType: dataType || "json"
			}).done(function(data){
				callBack(data);
			}).fail(function(jqXHR, textStatus, errorThrown){
				if (failCallBack) {
					failCallBack(jqXHR);
				}
			});
		},

		callJson: function(url, param, callBack, failCallBack, asyncFlag){
			$.ajax({
				async: asyncFlag == '1' ? false : true,
				url : url,
				method : "POST",
				dataType: 'json',
				contentType: "application/json",
				data: JSON.stringify(param)
			}).done(function(data){
				callBack(data);
			}).fail(function(jqXHR, textStatus, errorThrown){
				if (failCallBack) {
					failCallBack(jqXHR);
				}
			});
		},

		callstream: function(url, param, callBack, failCallBack){
			$.ajax({
				async: true,
				url : url,
				method : "POST",
				dataType: 'text',
				contentType: "application/json",
				data: JSON.stringify(param)
			}).done(function(data){
				callBack(data);
			}).fail(function(jqXHR, textStatus, errorThrown){
				if (failCallBack) {
					failCallBack(jqXHR);
				}
			});
		},

		callService: function(type, url, param, callBack, failCallBack){
			$.ajax({
				async: true,
				url : url,
				type : type,
				dataType: 'json',
				contentType: "application/json",
				data: type.toLowerCase() == "get" ? null : JSON.stringify(param)
			}).done(function(data){
				callBack(data);
			}).fail(function(jqXHR, textStatus, errorThrown){
				if (failCallBack) {
					failCallBack(jqXHR);
				}
			});
		},
		callAction : function(type, url, param, callBack, failCallBack){
			$.ajax({
				async: true,
				url : url,
				type : type,
				dataType: 'json',
				data: type.toLowerCase() == "get" ? null : param
			}).done(function(data){
				callBack(data);
			}).fail(function(jqXHR, textStatus, errorThrown){
				if (failCallBack) {
					failCallBack(jqXHR);
				}
			});
		}
	},
	
	ExportExcel : function (columns,title,rows,fileName){
		var newWorkbook = new kendo.ooxml.Workbook({
			sheets : [ {
				columns : columns,
				title : title,
				rows : rows
			} ]
		});
		
		kendo.saveAs({
			dataURI : newWorkbook.toDataURL(),
			fileName : fileName
		})
		top.kendo.ui.progress($(".show-dashboard"), false);
	},

	toggleCollapse: function(){
		$(document).on("click", "div[data-toggle='collapse']", function(){
			if ($(this).attr("aria-expanded") == "false"){
				$(this).attr("aria-expanded", "true");
			} else {
				$(this).attr("aria-expanded", "false");
			}
		});
	},
	comments: function(comments,result,theSum){
		/*$(function(){
			var the_sum=$(whole).text();
			$(result).text(the_sum);
			$(commadd).val("");
			$(result).css("color","#333").siblings().css("color","#333");
			$(commadd).bind('input',function(){
				var comment_value=$(this).val(),
					sub_comment=comment_value.substring(0,the_sum),
					valLength=$(commadd).val().length;
				$(commadd).val(sub_comment);
				if(valLength<the_sum){
					$(result).text(the_sum-valLength);
					$(result).css("color","#333").siblings().css("color","#333");
				}else{
					$(result).text("0");
					$(result).css("color","red").siblings().css("color","red");
				}
			})
		})*/
		$(comments).val("");
		$(result).text($(theSum).text());
		$(document).on("input",  "textarea.commadd",  function(index){
			var $this=(index.target);
			var next=$($this).next()[0];
			var nextAll=$(next).find("span");
			var whole=$(nextAll[2]).text();
			var commentValue=$($this).val(),
				subComment=commentValue.substring(0,whole),
				valLength=$($this).val().length;
			$($this).val(subComment);
			if(valLength<whole){
				$(nextAll[0]).text(whole-valLength);
				$(nextAll).css("color","#333");
			}else{
				$(nextAll[0]).text("0");
				$(nextAll).css("color","red");
			}
		});
	},

	toggleSideBar: function(){
		$(document).on("click", "button.self-toggleSiderBar,span.self-toggleSiderBar", function(){
			var outerContainer = $(this).closest(".self-outerContainer");
			if($(this).prop("tagName")=="SPAN"){
				$(this).toggleClass("glyphicon-backward");
				$(this).toggleClass("glyphicon-forward");
			}
			outerContainer.toggleClass("sidebarOpen");
		});
	},
	
	clearSortAndFilter: function(gridObj){
	  gridObj.dataSource.filter(null);
    gridObj.dataSource.sort(null);
	},

	/**
	 * enter event
	 * @param {String} selector
	 * @param {Function} searchEven
	 */
	textSearch: function(selector, searchEvent){
		$(selector).keypress(function (e) {
			var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
			if (keyCode == 13){
				searchEvent();
			}
		});
	},

	/**
	 * format string 
	 * usage:　formatStringRes("Hi, {1}.Nice to meet you, i'm {2}", "Lily", "Lucy") --> "Hi, Lily.Nice to meet you, i'm Lucy"
	 * @param {String} stringResource format: "Hi, {1}."
	 * @returns {String} finalString
	 */
	formatStringRes: function(stringResource){
		var args = arguments;
		var pattern = new RegExp("{([1-" + args.length + "])}", "g");
		return String(stringResource).replace(pattern, function(match, index){
			return (args[index] || "");
		});
	},

	kendo: {
		initDropDownList: function(id, textLabel, valueLabel){
			var dropdown = $("#" + id).kendoDropDownList({
				dataTextField: textLabel,
				dataValueField: valueLabel,
				autoWidth: true
			}).data("kendoDropDownList");
			return dropdown;
		},

		initRangeDatePicker: function(startId, endId, value){
			function startChange() {
				var startDate = start.value(),
					endDate = end.value();

				if (startDate) {
					startDate = new Date(startDate);
					startDate.setDate(startDate.getDate());
					end.min(startDate);
				} else if (endDate) {
					start.max(new Date(endDate));
				} else {
					endDate = new Date();
					start.max(endDate);
					end.min(endDate);
				}
			}

			function endChange() {
				var endDate = end.value(),
					startDate = start.value();

				if (endDate) {
					endDate = new Date(endDate);
					endDate.setDate(endDate.getDate());
					start.max(endDate);
				} else if (startDate) {
					end.min(new Date(startDate));
				} else {
					endDate = new Date();
					start.max(endDate);
					end.min(endDate);
				}
			}

			var start = $("#" + startId).kendoDatePicker({
				change: startChange,
				value: value,
				format: "dd/MM/yyyy"
			}).data("kendoDatePicker");

			var end = $("#" + endId).kendoDatePicker({
				change: endChange,
				value: value,
				format: "dd/MM/yyyy"
			}).data("kendoDatePicker");

			setTimeout(function(){
				if (start && end) {
					start.max(end.value());
					end.min(start.value());
				}
			}, 100);
		},

		initRangeDateTimePicker: function(startId, endId){
			function startChange() {
				var startDate = start.value(),
					endDate = end.value();

				if (startDate) {
					startDate = new Date(startDate);
					startDate.setDate(startDate.getDate());
					end.min(startDate);
				} else if (endDate) {
					start.max(new Date(endDate));
				} else {
					endDate = new Date();
					start.max(endDate);
					end.min(endDate);
				}
			}

			function endChange() {
				var endDate = end.value(),
					startDate = start.value();

				if (endDate) {
					endDate = new Date(endDate);
					endDate.setDate(endDate.getDate());
					start.max(endDate);
				} else if (startDate) {
					end.min(new Date(startDate));
				} else {
					endDate = new Date();
					start.max(endDate);
					end.min(endDate);
				}
			}

			//var today = kendo.date.today();

			var start = $("#" + startId).kendoDateTimePicker({
				//value: today,
				change: startChange,
				format: "dd/MM/yyyy HH:mm:ss",
				parseFormats: ["MMMM yyyy", "HH:mm"]
			}).data("kendoDateTimePicker");

			var end = $("#" + endId).kendoDateTimePicker({
				//value: today,
				change: endChange,
				format: "dd/MM/yyyy HH:mm:ss",
				parseFormats: ["MMMM yyyy", "HH:mm"]
			}).data("kendoDateTimePicker");

			start.max(end.value());
			end.min(start.value());
		}
	},

	dateUtil: {
		toFormat:function(date,format){
			if(!date) return "";
			var d = (typeof date=='object'?date:new Date(date));
			return d.format(format);
		},
		strFormat: function(val, orgFormat, format){
			if(!val) return "";
			var dateStr = "";
			var day = "", month = "", year = "";
			if (orgFormat == "ddMMyyyy") {
				day = val.substr(0, 2);
				month = val.substr(2, 2);
				year = val.substr(4, 4);
			}

			if (format == "yyyy-MM-dd") {
				dateStr = year + "-" + month + "-" + day;
			}

			return dateStr;
		},
		
		getDateFromMilSeconds: function(milliseconds){
		  if (milliseconds) {
		    return new Date(new Date(milliseconds).format("yyyy/MM/dd 00:00:00"));
		  }
		  return null;
		}
	},

	formatMoney : function(s, n)
	{
		n = n > 0 && n <= 20 ? n : 2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = s.split(".")[0].split("").reverse(),
			r = s.split(".")[1];
		var t = "";
		for(var i = 0; i < l.length; i ++ ) {
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
		return t.split("").reverse().join("") + "." + r;
	},

	formatVND : function(s) {
		if (s) {
			s += "";
			var l = s.split(".")[0].split("").reverse();
			var r = s.split(".")[1];
			var t = "";
			for(var i = 0; i < l.length; i ++ ){
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "." : "");
			}

			if (r) {
				return t.split("").reverse().join("") + "." + r;
			} else {
				return t.split("").reverse().join("") + ".000";
			}
		}
		return "";
	},

	formatCallbackVND : function(s) {
		if (s) {
			s += "";
			var l = s.split(".")[0].split("").reverse();
			var r = s.split(".")[1];
			var t = "";
			for(var i = 0; i < l.length; i ++ ){
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "." : "");
			}

			if (r) {
				return t.split("").reverse().join("") + "." + r;
			} else {
				return t.split("").reverse().join("");
			}
		}
		return "";
	},

	recoverMoney: function (s){
		return parseFloat(s.replace(/[^\d\.-]/g, ""));
	},

	closeWindow: function(){
	  window.opener = null;
	  window.open('','_self','');
		window.close();
	},

	preCheckWorkItem: function(key){
		var deferred = new $.Deferred();
		$.ajax({
			async: true,
			url : "/sonora/JsonAjax?method=PSO.PI.checkValidWI&repKey=" + key,
			method : "POST"
		}).done(function(data){
			if (data){
				if (data.RESPONSE_CD == "0") {
					deferred.resolve({flag: true});
				} else {
					deferred.resolve({flag: false, message: data.RESPONSE_DESC});
				}
			} else {
				deferred.resolve({flag: false});
			}
		});

		return deferred.promise();
	},

	toShowTif: function(docId){
		var doDeployFrame1 = function(docId,pageCount,mode){
			var frameId = "document_viewer";
			$("iframe[id='" + frameId+ "']").contents().find("body").empty();
			$("iframe[id='" + frameId+ "']").contents().find("body").removeAttr("style");
			$("iframe[id='" + frameId+ "']").contents().find("body").attr("style","width:100%;height:100%;margin:0px;padding:0px;OVERFLOW-Y:HIDDEN;OVERFLOW-X:HIDDEN;");
			var container_height=$("iframe[id='" + frameId+ "']").height();
			$("iframe[id='" + frameId+ "']").contents().find("body").append("<div id='document_div' class='document_show' style='display:block;WIDTH: 100%; HEIGHT:"+container_height+"px;OVERFLOW-Y:HIDDEN;OVERFLOW-X:HIDDEN;clear:both;'/>");
			var doc_show= jQuery("iframe[id='" + frameId+ "']").contents().find('.document_show');
			doc_show.append("<iframe id='bigpic_frame' style='padding:0px;margin:0px;OVERFLOW-Y:HIDDEN;OVERFLOW-X:HIDDEN;' src='" + basePath + "/misc/tiffviewer.jsp?docId="+docId+"' height=100% width=100%>");
		};

		var doDeployFrame = function(docId,pageCount,mode){
			var frameId = "document_viewer";
			var parentForIframe=$("iframe[id='" + frameId+ "']").parent(".right_main");
			var container_height=$("iframe[id='" + frameId+ "']").height();
			$("iframe[id='" + frameId+ "']").remove();
			parentForIframe.append("<iframe id='" + frameId+ "' style='height:"+container_height+"px;min-height: 700px;width:100%;display:none'></iframe>");

			$("iframe[id='" + frameId+ "']").load(basePath + "/misc/instance.html",function(){
				doDeployFrame1(docId,pageCount,mode);
				$("iframe[id='" + frameId+ "']").show();
			});
		};

		var loadTiffDocument = function(docId,pageCount,mode){
			doDeployFrame(docId,pageCount,mode);
		};

		var xmlhttp;
		var pageCnt;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				pageCnt = xmlhttp.responseText;
				loadTiffDocument(docId, pageCnt, "doc");
			}
		};
		xmlhttp.open("GET","/sonora/query/getPageCount.jsp?docId="+docId, true);
		xmlhttp.send();
	},
	
	preventWindowBack: function(){
	  // add by Kimi on 2018/11/11 for C360P-4
	  history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });
	},

	getCurrentDate: function(){
		/**
		 var mydate = new Date();
		 var show_day=new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
		 var show_month=new Array('January','February','March','April','May','June','July','August','September','October','November','December');
		 var t=show_day[mydate.getDay()]+','+show_month[mydate.getMonth()]+' '+mydate.getDate()+','+mydate.getFullYear()+' '+mydate.getHours()+':'+mydate.getMinutes();//mydate.toLocaleString();
		 $("#message_board .refresh_icon").html(t);
		 */
		$("#message_board .refresh_icon").unbind("click").on("click", function(e){
			var mydate = new Date();
			var show_day=new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
			var show_month=new Array('January','February','March','April','May','June','July','August','September','October','November','December');
			var hours = mydate.getHours();
			if (hours < 10) {
				hours = "0" + hours;
			}
			var minutes = mydate.getMinutes();
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			var t=show_day[mydate.getDay()]+','+show_month[mydate.getMonth()]+' '+mydate.getDate()+','+mydate.getFullYear()+' '+hours+':'+minutes;//mydate.toLocaleString();
			$("#message_board .refresh_icon").html(t);
		});

		$("#message_board .refresh_icon").click();
	},

	/**
	 * check policy no
	 * create by Kimi on 2017-10-09
	 */
	checkPolicyNo: function(policy){
		var nLength = policy.length;
		// 1. policy no length is 10 digit
		if (nLength != 10) {
			// if policy no length is 9 digit, all 9 digit are numeric and First 3 digits are "000"
			if (nLength == 9 && policy.match(/^\d+/) && policy.substring(0,3) == "000") {
				return true; // it's old policy no
			} else {
				return false;// policy no is invalid
			}
		}

		// 2. first char in policy no is Alphabet and last 9 char are numeric digit
		if (isNaN(policy.substring(2,9))) {
			return false; // policy no is invalid
		}

		// 3. first char in policy no is "I"
		if(policy.substring(0,1) == "I"){
			return true; // it's Dummy policy no
		}

		// 4. numbers from 2nd to 10th in policy no will be processed to get check-sum no as below:
		// *  val1 = sum char at(3, 6, 9) and multiply with 7
		// *  val2 = sum char at(2, 5, 8) and multiply with 3
		// *  val3 = sum char at(4, 7)
		// *  val = val1 + val2 + val3
		// *  checkSumNo = 10 minus (val MOD 10)
		var n1 = parseInt(policy.charAt(1));
		var n2 = parseInt(policy.charAt(2));
		var n3 = parseInt(policy.charAt(3));
		var n4 = parseInt(policy.charAt(4));
		var n5 = parseInt(policy.charAt(5));
		var n6 = parseInt(policy.charAt(6));
		var n7 = parseInt(policy.charAt(7));
		var n8 = parseInt(policy.charAt(8));
		var n9 = parseInt(policy.charAt(9));

		var nCheckSum = 10 - (((n2 + n5 + n8) * 7 + (n1 + n4 + n7) * 3 + (n3 + n6)) % 10) ;
		// if checkSumNo is same as 10th char of policy no, policy no is valid
		if (nCheckSum == n9) {
			return true;
		} else if (nCheckSum == 10 && n9 == 0) {
			return true;
		} else {
			return false;
		}

		return false;
	},
	

	checkPolicyNumber : function(policyNumber) {
		policyNumber = $.trim(policyNumber);
		
		var policyNoLength = policyNumber.length;
		if (policyNoLength != 10) {
			var reg1 = /^[0-9]{8}$/;
			var reg2 = /^[0-9]{9}$/;
			if (reg1.test(policyNumber) || reg2.test(policyNumber)) {
				return true;
			}
			return false;
		}

		var startStr = policyNumber.substring(0, 2);
		if (startStr == '00') {
			return true;
		}
		if(policyNumber.substring(0,1) == "I"){
      return true; // it's Dummy policy no
    }
		var p1 = parseInt(policyNumber.substring(1, 2));
		var p2 = parseInt(policyNumber.substring(2, 3));
		var p3 = parseInt(policyNumber.substring(3, 4));
		var p4 = parseInt(policyNumber.substring(4, 5));
		var p5 = parseInt(policyNumber.substring(5, 6));
		var p6 = parseInt(policyNumber.substring(6, 7));
		var p7 = parseInt(policyNumber.substring(7, 8));
		var p8 = parseInt(policyNumber.substring(8, 9));
		var p9 = parseInt(policyNumber.substring(9, 10));

		if (p1 == null || p2 == null || p3 == null || p4 == null || p5 == null || p6 == null || p7 == null || p8 == null || p9 == null) {
			return false;
		}
		
		var checkValue = 10 - ((p2 + p5 + p8) * 7 + (p1 + p4 + p7) * 3 + (p3 + p6)) % 10;
		if (checkValue == 10) {
			checkValue = 0;
		}
		
		if (checkValue == p9) {
			return true;
		} else {
			return false;
		}
	},

	START_DT: null,
	TIMER: null,
	END_DT: null,
	WAITING_TIMER: null,
	/**
	 * check session timeout
	 * @author bsnpbxw
	 * @createDate 2018/03/16
	 */
	
	checkSessionTimeout: function(){
	  var that = this;
		// session duration is 30 minutes
		var TIME_OUT = 30*60;
		var checkSessionStatus = function(){
		  that.START_DT = new Date();
			clearInterval(that.TIMER);
			that.TIMER = setInterval(function(){
				var END_DT = new Date();
				var diff = parseInt(parseInt(END_DT - that.START_DT) / 1000);
				if (diff == (TIME_OUT - 5*60)) {
				  window.focus();
					// pop up message
				  /*
					PromptWindow.alert("This session will expire in 5 mins, please click OK if you wish to continue", function(){
					  clearTimeout(that.WAITING_TIMER);
					  checkSessionStatus();
					});
					clearTimeout(that.WAITING_TIMER);
          that.WAITING_TIMER = setTimeout(function(){
            window.location.href = basePath + "/display/sessionExpire";
          }, 5*60*1000);
          */
					if(confirm("This session will expire in 5 mins, please click OK if you wish to continue")){
					  clearTimeout(that.WAITING_TIMER);
            checkSessionStatus();
					} else {
					  clearTimeout(that.WAITING_TIMER);
					  that.WAITING_TIMER = setTimeout(function(){
					    window.location.href = basePath + "/display/sessionExpire";
					  }, 5*60*1000);
					}
					
				}
			}, 1000);
		};
		if (that.START_DT == null) {
		  $("body").on("click mouseenter mousemove keydown contextmenu focus keyup", function(e){
		    checkSessionStatus();
		  });
		}
		checkSessionStatus();
	},
	/**
	 * @auther asnphj2
	 * @createDate 2018/10/19
	 */
	checkTimeoutLogout : function(flag){
		window.localStorage.setItem("lastTime",new Date());
		window.localStorage.setItem("cascadeLogout","0");
		var logoutTimer;
		var def = new $.Deferred();
		var lastTime = window.localStorage.getItem("lastTime");
		if(flag=true){
			var BLUR_DT=new Date();
			var BLUR_TIME_OUT = 30*60;
			logoutTimer = setInterval(function(){
				var OUT_DT = new Date();
				var diff = parseInt((OUT_DT - BLUR_DT) / 1000);
				var endTime = window.localStorage.getItem("lastTime");
				var cascade = window.localStorage.getItem("cascadeLogout");
				if(diff >= BLUR_TIME_OUT && endTime == lastTime){
					 clearInterval(logoutTimer);
				     var url="/sonora-services/case/authority/logOut";
				     CommonUtils.ajax.callService("POST", url, {}, function(data){
				      	 if (data.RESPONSE_CD == "0") {
				      		window.location.href = basePath + "/display/logOutPage";
					        window.localStorage.clear();
					        window.localStorage.setItem("cascadeLogout","1");
				      	 } else {
				      	   def.resolve(null);
				      	 }
				    	 }, function(){
				    	   def.resolve(null);
				    	 });
				}else if(diff >= BLUR_TIME_OUT && cascade=="1"){
					 clearInterval(logoutTimer);
				     var url="/sonora-services/case/authority/logOut";
				     CommonUtils.ajax.callService("POST", url, {}, function(data){
				      	 if (data.RESPONSE_CD == "0") {
				      		window.location.href = basePath + "/display/logOutPage";
					        
				      	 } else {
				      	   def.resolve(null);
				      	 }
				    	 }, function(){
				    	   def.resolve(null);
				    	 });
				}
			},1000);
		}else{
			clearInterval(logoutTimer);
		}
	},
	
	/**
	 *
	 */
	 getCurrentUser: function(){
	   this.preventWindowBack();
  	 var def = new $.Deferred();
  	 /*var logonUser = window.localStorage.getItem("LogonUser");
  	 if (logonUser) {
  	   def.resolve(true);
  	 } else {*/
    	 CommonUtils.ajax.callService("POST", "/sonora-services/case/search/getCurrentUser", {}, function(data){
      	 if (data.RESPONSE_CD == "0") {
        	 if (data.DATA.USERID) {
        	   window.localStorage.setItem("LogonUser", data.DATA.USERID.toUpperCase());
        	   window.localStorage.setItem("LogonUserName", (data.DATA.USERNAME || ""));
        	   if (data.DATA.COMPANY) {
        	   		window.localStorage.setItem("LogonUserCompany", data.DATA.COMPANY.toUpperCase());
        	   }
        	   
        	   if (data.DATA.DEPARTMENT) {
        	   		window.localStorage.setItem("LogonUserDepartment", data.DATA.DEPARTMENT.toUpperCase());
        	   }
        	   
        	   if (data.DATA.ISLEADER) {
        	     window.localStorage.setItem("LogonUserIsLeader", data.DATA.ISLEADER);
        	   }
        	   
        	   def.resolve(true);
        	 } else {
        	   def.resolve(null);
        	 }
      	 } else {
      	   def.resolve(null);
      	 }
    	 }, function(){
    	   def.resolve(null);
    	 });
  	 /*}*/
  	 return def.promise();
	 },
	 
	 getAllDepts: function(){
     var def = new $.Deferred();
     /*var depts = window.localStorage.getItem("DEPT_LIST");
     if (depts) {
       def.resolve(depts);
     } else {
       */
       CommonUtils.ajax.callService("get", "/sonora-services/dropDownList/listDept", {}, function(data){
         if (data && data.RESPONSE_CD == "0") {
           var list = [];
           $.each(data.DATA, function(index, dept){
             list.push({"value": dept.DEPARTMENT, "text": dept.DEPARTMENT_NM});
           });
           window.localStorage.setItem("DEPT_LIST", JSON.stringify(list));
           def.resolve(JSON.stringify(list));
         } else {
           def.resolve(JSON.stringify([]));
           PromptWindow.alert("There is an error when loading department list, the detail information is below: " + data.RESPONSE_DESC);
         }
       });
     /*}*/
     return def.promise();
   },
	setMvvmDropDownWidth:function(containId){
		var inputs = $(containId).find("input[data-mvvm='dropdownlist']");
		$.each(inputs, function(index,item){
//			$(item).data("kendoDropDownList").setOptions({autoWidth:true});
			var dropDownObject=$(item).data("kendoDropDownList");
			 var dropDownWidth=dropDownObject.list.width();
			 dropDownObject.list.width(dropDownWidth+20);
		});
	},
	  
	  //store user buttons
	  ALL_BUTTONS: [],
	  /**
	   * Call WS to get user buttons
	   */
	  getUserButtons: function(){
	    var that = this;
	    var def = new $.Deferred();
	     /*if (that.ALL_BUTTONS.length > 0) {
	       def.resolve(that.ALL_BUTTONS);
	     } else {*/
	       CommonUtils.ajax.callService("post", "/sonora-services/case/uam/getUserButtons", {}, function(data){
	         if (data && data.RESPONSE_CD == "0") {
	           that.ALL_BUTTONS = data.DATA || [];
	           def.resolve(that.ALL_BUTTONS);
	         } else {
	           def.resolve([]);
	           PromptWindow.alert("There is an error when get user buttons, the detail information is below: " + data.RESPONSE_DESC);
	         }
	       });
	     /*}*/
	     return def.promise();
	  },
		grid2Excel:function(gridIDOrObj,excelTitle,data){//just for inquiry!!
			var gridObject;
			if(typeof gridIDOrObj=='object'){
				gridObject=gridIDOrObj;
			}
			else{
				gridObject=$("#"+gridIDOrObj);
			}
			var gridObject = $(gridObject).data("kendoGrid");

			var saveAsExcel = function(grid,data){
				 var titleColumn = new Array();
				 var fieldNames = new Array();
//				 var templates=new Array();
				 for(var i = 0; i < grid.columns.length; i++){
					 if (grid.columns[i].hidden==true){
						 continue;
					 }
					 titleColumn.push({value: (grid.columns[i].title||"").toUpperCase(),background:"#7a7a7a",color:"#fff",rowSpan:1});
					 fieldNames.push(grid.columns[i].field);
//					 templates.push(grid.columns[i].template);
				 }
				 var rows = [{cells:titleColumn,type:"header"}];
				 var externalData=data;
				      //using fetch, so we can process the data when the request is successfully completed
				 grid.dataSource.fetch(function(){
				        var dataArr;
				        
				        if(externalData==undefined) externalData=null;
				        if(externalData==null){
				        	dataArr = this.data();
				        }
				        else{
				        	dataArr=externalData;
				        }
				        
				        var valColumn = null;
				        if(dataArr==undefined) dataArr=[];
				        for (var i = 0; i < dataArr.length; i++){

				           valColumn = new Array();
				           var data=dataArr[i];
				          //push single row for every record
				          for(var j=0; j< fieldNames.length;j++){
				        	  var currItem=data[fieldNames[j]];
				        	  valColumn.push({value:currItem});
				          }
				          rows.push({cells: valColumn,type:"data"})
				        }
				        var cls = new Array();

						$(fieldNames).each(function(index,item){
							cls.push({ autoWidth: true });
		 				});

						var workbook = new kendo.ooxml.Workbook({
							sheets: [
							{
								columns: cls,
								// Title of the sheet
								title: excelTitle,
								// Rows of the sheet
								rows: rows
							}
							]
						});
						//save the file as Excel file with extension xlsx
						kendo.saveAs({dataURI: workbook.toDataURL(), fileName: excelTitle+".xlsx"});
						});
			};
			saveAsExcel(gridObject,data);
		},
	processType:function(process){
		process = [
			{"value": "", "text": ""},
			{"value": "UNIP", "text": "UNIP"},
			{"value": "UNIX", "text": "UNIX"},
			{"value": "POSP", "text": "POSP"},
			{"value": "POSX", "text": "POSX"},
			{"value": "CLMP", "text": "CLMP"},
			{"value": "CLMX", "text": "CLMX"}
		];
		return process;
	},
	
	customerFilter4Date: function(e, fields){
	  if ($.inArray(e.field, fields) >= 0) {
      if (e.filter) {
        var newFilter = {"logic": e.filter.logic, "filters": []};
        $.each(e.filter.filters, function(index, flt){
          newFilter.filters.push({"field": "f_" + flt.field, "operator": flt.operator, "value": flt.value});
        });
        
        e.sender.dataSource.filter(newFilter);
        e.preventDefault();
      } else {
        e.sender.dataSource.filter(null);
        e.preventDefault();
      }
    }
	},
	
	/**
	 * @param ajaxObj {url:url,method:post/get,data:data}
	 * @param pageSize Number
	 * @param dataFn function
	 * @param totalFn function
	 * @param isServerPaging boolean
	 * @param isServerSorting boolean
	 */
	serverPaging: function(ajaxObj, pageSize, isServerPaging, isServerFilter, dataFn, totalFn, successFn){
	  var pageSize = pageSize ? pageSize:20;
	  var url = ajaxObj.url;
	  var method = ajaxObj.method?ajaxObj.method:'get';
	  var data = ajaxObj.data?ajaxObj.data:{};
	  var dataSource = new kendo.data.DataSource({
	      transport: {
	        read: {
	          type: method,
	          url: url,
	          data: data,
	          contentType: "application/json;charset=UTF-8",
	          complete:function(d){
	            if (d.responseJSON && d.responseJSON.RESPONSE_CD && d.responseJSON.RESPONSE_CD != "0") {
	              PromptWindow.alert("Loading error: " + d.responseJSON.RESPONSE_CD);
	            } else if (d.responseJSON && d.responseJSON.RESPONSE_CD && d.responseJSON.RESPONSE_CD == "0") {
	              if (successFn) {
	                successFn();
	              }
	            }
	          }
	        },
	        parameterMap : function(options, operation) {
	          if (operation == "read") {
	            var orderBy = "";
	            var sord = "";
	            var filters = [];
	            if(options.sort != null && options.sort.length > 0){
	              var sort = options.sort[0];
	              orderBy = sort.field;
	              sord = sort.dir; // asc/desc
	            }
	            if (isServerFilter && options.filter) {
	              // TODO get filter parameter
	            }
	            var parameters = {};
	            parameters['pageIndex'] = options.page;  // pageNo
	            parameters['pageSize'] = options.pageSize; // pageSize
	            parameters['orderBy'] = orderBy||'';  // orderBy
	            parameters['sord'] = sord||''; // sortDirection
	            if (isServerFilter) {
	              parameters['filters'] = filters;
	            }
	            
	            var postData=ajaxObj.data?ajaxObj.data:{};
	            $.extend(postData,parameters);
	      
	            return JSON.stringify(postData);
	          }
	        }
	      },
	      batch: false,
	      schema: {
	        data: function (d) {
	          if (Array.isArray(d.DATA)) {
	            var taskList = d.DATA;
      	      if (dataFn) {
      	        taskList = dataFn(taskList);
      	      }
	            return taskList;
	          }
	          return [];
	        },
	        total: function (d) {
	          var totalCounts = 0;
	          if (isServerPaging) {
	            // TODO get all records total
	          } else {
	            if (Array.isArray(d.DATA)) {
	              totalCounts = d.DATA.length;
	            }
	          }
    	      if (totalFn) {
    	        totalFn(totalCounts);
    	      }
	          return totalCounts;
	        }
	      },
	      page: 1,
	      pageSize: pageSize,
	      serverPaging: isServerPaging,
	      serverFiltering: isServerFilter,
	      serverSorting: false
	    });
	  
	  return dataSource;
	},
	
	dealReqNum: function(reqNo){
	  // for child case
	  if (reqNo && reqNo.length == 16) {
	    var start = reqNo.substr(0,14);
      var end = reqNo.substr(14,16);
      var newReqNo = start + "-" + end;
      return newReqNo;
	  }
	  
	  return reqNo || "";
	},
	
	getRealReqNum: function(reqNo){
    if (reqNo.contains("-") && reqNo.length == 17) {
      var strs = reqNo.split("-");
      reqNo = (strs[0] || "") + (strs[1] || "");
    }
    
    return reqNo || "";
  },
	
	supportWindowDrag: function(){
	  $(document).on("mousedown", "div[role='dialog']", function(){
	    $(this).draggable({
        cursor: "move",
        handle: '.modal-header'
      });
    });
	},
	
	resetScrollBarPosition: function(){
	  var zlDivs = $("body").find("div.zl-scrollContentDiv");
	  $.each(zlDivs, function(idx, zlDiv){
	    $(zlDiv).css({"top": 0});
	  });
	},
	
	exportGrid2Excel: function(gridObj, dataList, excelTitle, tempList){
	  var columns = gridObj.columns;
    columns = _.filter(columns, function(item){
      return item.field != null && item.field != "" && item.hidden != true;
    });
    var colsLength = columns.length;
    var cols = [];
    var headers = [];
    $.each(columns, function(index, column){
      cols.push({autoWidth: true});
      
      headers.push({value: column.title.toUpperCase(), background: "#7a7a7a", color: "#fff"});
    });
    
    var rows = [];
    // set head
    rows.push({cells: headers});
    
    $(dataList).each(function(index, item){
      rows[index+1] = {cells: []};
      for(var i = 0, len = colsLength; i < len; i++){
        var template = columns[i].template;
        var field = columns[i].field;
        if ($.inArray(field, ["IS_URGENT", "SLASTATUS", "SNATCH"]) >= 0) {
          rows[index+1].cells[i] = {value: item[field]};
        } else {
          if (typeof template == "function") {
            if (tempList) {
              var specialTemp = _.find(tempList, function(obj){
                return obj.field == field;
              });
              if (specialTemp) {
                rows[index+1].cells[i] = {value: specialTemp.fn(item)};
              } else {
                rows[index+1].cells[i] = {value: template(item)};
              }
            } else {
              rows[index+1].cells[i] = {value: template(item)};
            }
          } else {
            rows[index+1].cells[i] = {value: item[field]};
          }
        }
      }
    });
    
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
      {
        columns: cols,
        // Title of the sheet
        title: excelTitle,
        // first row is frozen
        frozenRows: 1,
        // which column is filterable
        filter: { from: 0, to: colsLength - 1 },
        // Rows of the sheet
        rows: rows
      }
      ]
    });
    //save the file as Excel file with extension xlsx
    kendo.saveAs({dataURI: workbook.toDataURL(), fileName: excelTitle+".xlsx"});
	},
	
	//add a expand/collapse button by Lucas at 2018/10/23
	expandOrCollaTree :function(e,$treeObj,loadDivId){
	  //top.kendo.ui.progress($("#"+loadDivId), true);
	  $treeObj.expand(".k-item");
	  /*var iconText=$(e.target).text();
    if(iconText.toUpperCase()=="Expand All".toUpperCase()){
      // expand root node
      var isAllExpand=setInterval(function(){
        if($("#"+treeId).find("span.k-i-expand").length==0){
          //top.kendo.ui.progress($("#"+loadDivId), false);
          //$(e.target).text("Collapse All");
          clearInterval(isAllExpand);
        }
      },1000);
    }/*else{
      // collapse root node
      $treeObj.collapse(".k-item");
      var isAllColla=setInterval(function(){
        if($("#tree_pfh").find("span.k-i-collapse").length==0){
          top.kendo.ui.progress($("#"+loadDivId), false);
          $(e.target).text("Expand All");
          clearInterval(isAllColla);
        }
      },1000);
    }*/
	}
};
