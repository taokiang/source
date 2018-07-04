function plusXing (str,frontLen,endLen) { 
  //处理电话号码、身份证
  //这三个参数的含义：str：字符串，frontLen：前面保留位数，endLen：后面保留位数
  var len = str.length-frontLen-endLen;
  var xing = '';
  for (var i=0;i<len;i++) {
        xing+='*';
  }
  return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
}


function offMusic(el){
  //H5音乐按钮
  if($(el).hasClass('off')){
    $(el).removeClass('off');
    $(el).addClass('on');
    $('#audio')[0].play();
    return false;
  }else{
    $(el).addClass('off');
    $(el).removeClass('on');
    $('#audio')[0].pause();
    return false;
  }
}
/*函数防抖与节流*/
/*
    延时执行
    @param fn function
    @param wait number
    @return function
*/

function debounce(fn, wait) {
    var timeout = null;
    return function() {
        if(timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}

// 处理函数
function handle() {
    console.log(Math.random()); 
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 500));

/*
    节流函数
    @param fn function
    @param wait number
    @param maxTimeLong number
    @return function
*/
function throttling(fn, wait, maxTimelong) {
    var timeout = null,
        startTime = Date.parse(new Date);

    return function() {
        if(timeout !== null) clearTimeout(timeout);
        var curTime = Date.parse(new Date);
        if(curTime-startTime>=maxTimelong) {
            fn();
            startTime = curTime;
        } else {
            timeout = setTimeout(fn, wait);
        }
    }
}

window.addEventListener('scroll', throttling(handle, 300, 1000));

/*排序函数*/
sort(sortNumber);

function sortNumber(a,b){
  return a-b;
}

//数组对象方法排序:
sortByKey(a,'b');
function sortByKey(array,key){
    return array.sort(function(a,b){
      var x=a[key];
      var y=b[key];
      return ((x<y)?-1:((x>y)?1:0));
   });
}

//touchstart
function touchSatrtFunc(e) {  
    //evt.preventDefault(); 
    var touch = e.touches[0]; 
    var x = Number(touch.pageX);  
    var y = Number(touch.pageY); 
  
    startX = x;  
    startY = y;  
}  
//touchmove 
function touchMoveFunc(e) {  
    //evt.preventDefault();  
    var touch = evt.touches[0];  
    var x = Number(touch.pageX);  
    var y = Number(touch.pageY); 
    var text = 'TouchMove' + x + ', ' + y + '￡?';  
 
    if (x - startX != 0) {  
  
    }  
    if (y - startY != 0) {  
 
    }  
}

function isMobile(v) {  
    return (/^(?:13\d|15[0-9]|18[0-9]|17[0-9]|14[0-9])-?\d{5}(\d{3}|\*{3})$/.test(v));
};

function twoNumFilter(num){
  if(typeof num == Array){
    //数值
    return num.toFixed(2);  //保留两位小数点（四舍五入）
  }
  if (typeof num == string) {
    //字符串
    return Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));  
  }
};
/* 判断浏览器设备 */
var _browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {     //移动终端浏览器版本信息  
            trident: u.indexOf('Trident') > -1, //IE内核  
            presto: u.indexOf('Presto') > -1, //opera内核  
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器  
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器  
            iPad: u.indexOf('iPad') > -1, //是否iPad  
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
function browserType(iosFunc, androidFunc) {
    
    if (_browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面  
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象  
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            //在微信中打开  
            alert('weixin');
            //setInterval(WeixinJSBridge.call('closeWindow'), 2000);
        }
        if (ua.match(/WeiBo/i) == "weibo") {
            //在新浪微博客户端打开  
        }
        if (ua.match(/QQ/i) == "qq") {
            //在QQ空间打开  
        }
        if (_browser.versions.ios) {
            //是否在IOS浏览器打开 
            if (iosFunc && typeof (iosFunc) === 'function') {
                iosFunc();
            }
            alert('IOS'); 
        }
        if (_browser.versions.android) {
            //是否在安卓浏览器打开 
            if (androidFunc && typeof (androidFunc) === 'function') {
                androidFunc();
            }
            alert('android'); 
        }
    } else {
        //否则就是PC浏览器打开 
        alert('PC浏览器');
        //window.close();  
    } 
};
//时间戳 年月日时分秒
var timeStamp = function () {
    Date.prototype.Format = function (fmt) { // author: meizz
        var o = {
            'M+': this.getMonth() + 1, // 月份
            'd+': this.getDate(), // 日
            'h+': this.getHours(), // 小时
            'm+': this.getMinutes(), // 分
            's+': this.getSeconds(), // 秒
            'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
            'S': this.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        return fmt;
    }
    return new Date().Format('yyyy-MM-dd hh:mm:ss');
}
