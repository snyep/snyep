var andriodUrl="http://222.78.251.54:40020/umserver/SNYEP/SNYEP.apk";
var iosUrl="http://mbs.yyuap.com:8080/ump/web/appdownload/download?type=ios&buildId=10338&fileName=SNYEP.plist";
var andriodVersion="103";
var iosVersion="1.0.3";

/**
 * 底部对话框
 */
function botDialog() {
	//底部对话框
	layer.open({
		content : '是否要退出登录',
		btn : ['是的，我确定要退出', '我还想留在这'],
		skin : 'footer',
		yes : function() {
			layerAlert("退出");
			//清除缓存
			summer.getStorage("loginIngo", " ");
			layer.closeAll()
		}
	});
}

function layerCloseLoading() {
	layer.closeAll();
}

function layerLoading() {
	layer.open({
		type : 2,
		content : '加载中',
		shadeClose : false
	});
}

function showLoading() {
	UM.showLoadingBar({
		text : "加载中",
		icons : 'ti-loading',
	})
}

function hideLoading(){
	UM.hideLoadingBar();
}
/**
 * 节点校验
 */
function checkLoginInfo(id, url) {
	var loginInfo = summer.getStorage("loginInfo");
	if (!loginInfo) {
		layerConfirm();
	} else {
		summer.openWin({
			"id" : id,
			"url" : url,
		});
	}
}
/**
 * 节点校验后是否填写基本信息校验
 */
function checkLoginInfoAndSup(id, url) {
	var loginInfo = summer.getStorage("loginInfo");
	if (!loginInfo) {
		layerConfirm();
	} else {
		var pk_supplieraccess = summer.getStorage("pk_supplieraccess");
		if (pk_supplieraccess) {
			checkLoginInfo("supplierAptitude", "snyep/suppadmitList/html/suppadmitList.html");
		}else {
			layerAlert("请先填写供应商基本信息!");
		}
	}
}

/**
 *  询问提示
 */
function layerConfirm() {
	layer.open({
		content : '尚未登录，是否跳转登入',
		btn : ['马上登录', '我在看看'],
		yes : function() {
			summer.openWin({
				"id" : "login",
				"url" : "snyep/login/html/login.html",
			});
		}
	});
}

/**
 *弹窗提示
 */
function layerAlert(tital) {
	layer.open({
		content : tital,
		btn : '确定',
		shadeClose : false
	});
}

/**
 * 调用接口方法 对$summer.callAction({})的封装
 * @param {Object} viewid
 * 			后台带包名的Controller名
 * @param {Object} action
 * 			方法名
 * @param {Object} params
 * 			自定义参数
 * @param {Object} callback
 * 			成功回调函数
 */
function callAction(viewid, action, params, callback) {
	layerLoading();
	summer.callAction({
		"appid" : "SNYEP",
		"viewid" : viewid, //后台带包名的Controller名
		"action" : action, //方法名
		"params" : params, //自定义参数
		"callback" : callback + "()", //成功回调函数
		"error" : "erresg()", //失败回调函数
		"timeout" : "40"//超时40s
	});
}

/**
 * 查询存货分类接口
 * @param {Object} callback
 * 			成功回调函数
 */
function initInvclCallAction(callback) {
	var json = {};
	summer.callAction({
		"appid" : "SNYEP",
		"viewid" : "com.yonyou.snyep.controller.main.MainController", //后台带包名的Controller名
		"action" : "initInvcl", //方法名
		"params" : json, //自定义参数
		"callback" : callback + "()", //成功回调函数
		"error" : "erresg()", //失败回调函数
		"timeout" : "40"//超时40s
	});
}

/**
 * 获取轮播图
 * @param {Object} callback
 * 			成功回调函数
 */
function initBanerCallAction(callback) {
	var json = {};
	summer.callAction({
		"appid" : "SNYEP",
		"viewid" : "com.yonyou.snyep.controller.main.MainController", //后台带包名的Controller名
		"action" : "initBaner", //方法名
		"params" : json, //自定义参数
		"callback" : callback + "()", //成功回调函数
		"error" : "erresg()", //失败回调函数
		"timeout" : "40"//超时40s
	});
}

function showProgress() {
	summer.showProgress({
		"title" : "加载中..."
	});
}

/**
 *
 * @param {Object} jsfun
 * 					调用刷新方法名
 * @param {Object} path
 * 					文件名路径名不包含后缀名
 * 					例如 "html/main"
 */
function stridePagefun(jsfun, path) {
	var id = "" + path + ".html"
	var fun = "" + jsfun + "()";
	summer.execScript({
		winId : id,
		script : fun
	});
}

/**
 *
 * @param {Object} jsfun
 * 					调用刷新方法名
 * @param {Object} path
 * 					文件名路径名不包含后缀名
 * 					例如 "html/main"
 */
function stridefun(jsfun, path) {
	var id = path;
	var fun = "" + jsfun + "()";
	summer.execScript({
		winId : id,
		script : fun
	});
}

/**
 * 获取手机时间
 * 年-月-日
 */
function getNowFormatDate() {//获取年月日
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	/*+ " " + date.getHours() + seperator2 + date.getMinutes()
	 + seperator2 + date.getSeconds();*/
	return currentdate;
}
/**
 * 获取手机时间
 * 年-月-日 时分秒
 */
function getNowFormatTime() {//获取年月日
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	+ " " + date.getHours() + seperator2 + date.getMinutes()
	 + seperator2 + date.getSeconds();
	return currentdate;
}

/**
 * 获取一周前的日期
 */
function getBeforeOneWeekDate(){
	var now = new Date();
	var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (day >= 0 && day <= 9) {
		day = "0" + day;
	}
	var beforeDate = year + '-' + month + '-' + day ;
	return beforeDate;
}

/**
 * 获取手机时间
 * 年-月-日 时:分:秒
 */
function getNowFormatDateTime() {//获取年月日 时分秒
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
	return currentdate;
}

function getNowYear(){
	var date = new Date();
	return date.getFullYear();
}

/**
 * 四舍五入
 */
function round(num, d) {
	//Step1:将num放大10的d次方倍
	num *= Math.pow(10, d);
	//Step2:对num四舍五入取整
	num = Math.round(num);
	//Step：返回num缩小10的d次方倍，获得最终结果
	return num / Math.pow(10, d);
}

function isOs() {
	var browser = {
		info : function() {
			var ua = navigator.userAgent,
			    app = navigator.appVersion;
			return {//移动终端浏览器版本信息
				//trident: ua.indexOf('Trident') > -1, //IE内核
				//presto: ua.indexOf('Presto') > -1, //opera内核
				webKit : ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				//gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
				mobile : !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios : !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android : ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
				iPhone : ua.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
				iPad : ua.indexOf('iPad') > -1, //是否iPad
				//webApp: ua.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
				platform : navigator.platform
			};
		}(),
		lang : (navigator.browserLanguage || navigator.language).toLowerCase()
	};
	if (browser.info.platform.toLowerCase().indexOf("win") >= 0) {
		return "pc"
	} else if (browser.info.android) {
		return "android";
	} else if (browser.info.ios || browser.info.iPhone || browser.info.iPad) {
		return "ios";
	} else {
		return "";
	}
}
/**
 *判断车牌号 
 */
function isLicenseNo(str) {
	return /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(str);
}
/**
 *关闭上一页loading 
 * @param {Object} lastPageID
 */
function closeLastPageLoading(lastPageID){
	summer.execScript({
		winId : lastPageID,
		script : "closeLoading()"
	});
}
