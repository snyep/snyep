var andriodUrl = "http://222.78.251.20:8455/umserver/ZSYZ.apk";
var iosUrl = "http://mbs.yyuap.com:8080/ump/web/appdownload/download?type=ios&buildId=49835&fileName=ZSYZ.plist";
var version = "1003";

function versionup() {
	var versionInfo = $summer.strToJson(summer.getAppVersion());
	if (versionInfo.versionCode != version) {
		UM.confirm({
			"title" : "提示",
			"text" : "检测到新版本\n 是否进行升级?",
			"btnText" : ["取消", "确认"],
			"overlay" : true,
			"ok" : function() {
				var os = isOs();
				var url;
				if ("android" == os) {
					url = andriodUrl;
				} else {
					url = iosUrl;
				}
				if (url) {
					summer.upgradeApp({
						"url" : url //App 下载地址
					}, function() {

					}, function() {
						alert("应用升级错误");
					});
				}
			},
			"cancle" : function() {
			}
		});

	} else {
		UM.alert('当前版本已是最新版本');
	}
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
