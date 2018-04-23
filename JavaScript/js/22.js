//XHR兼容性处理
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    var xhr = new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    return xhr;
                } catch (e) {
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available")
    }
}

function addEvent (element, type, handler) {  
    if (element.addEventListener) {  
        element.addEventListener(type, handler, false);  
    } else if (element.attachEvent) {  
        element.attachEvent("on" + type, handler);  
    } else {  
        element["on" + type] = handler;  
    }  
} 

//惰性载入函数,防止重复加载if语句
//第一种
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
    	createXHR=function(){
    		return new XMLHttpRequest();
    	}       
    } else if (typeof ActiveXObject != "undefined") {
    	createXHR=function(){
	    	if (typeof arguments.callee.activeXString != "string") {
	            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
	            for (var i = 0, len = versions.length; i < len; i++) {
	                try {
	                    var xhr = new ActiveXObject(versions[i]);
	                    arguments.callee.activeXString = versions[i];
	                    return xhr;
	                } catch (e) {
	                    //跳过
	                }
	            }
	        }
	        return new ActiveXObject(arguments.callee.activeXString);	
    	}
    } else {
    	createXHR=function(){
    		throw new Error("No XHR object available");
    	}  
    }
    return createXHR();
}




function addEvent (type, element, handler) {  
    if (element.addEventListener) {  
        addEvent = function (type, element, handler) {  
            element.addEventListener(type, handler, false);  
        }  
    }  
    else if(element.attachEvent){  
        addEvent = function (type, element, handler) {  
            element.attachEvent('on' + type, handler);  
        }  
    }  
    else{  
        addEvent = function (type, element, handler) {  
            element['on' + type] = handler;  
        }  
    }  
    return addEvent(type, element, handler);  
}  

//第二种
var addEvent = (function () {  
    if (document.addEventListener) {  
        return function (type, element, fun) {  
            element.addEventListener(type, fun, false);  
        }  
    }  
    else if (document.attachEvent) {  
        return function (type, element, fun) {  
            element.attachEvent('on' + type, fun);  
        }  
    }  
    else {  
        return function (type, element, fun) {  
            element['on' + type] = fun;  
        }  
    }  
})(); 

var createXHR=(function () {
    if (typeof XMLHttpRequest != "undefined") {
    	return function(){
    		return new XMLHttpRequest();
    	}       
    } else if (typeof ActiveXObject != "undefined") {
    	return function(){
	    	if (typeof arguments.callee.activeXString != "string") {
	            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
	            for (var i = 0, len = versions.length; i < len; i++) {
	                try {
	                    var xhr = new ActiveXObject(versions[i]);
	                    arguments.callee.activeXString = versions[i];
	                    return xhr;
	                } catch (e) {
	                    //跳过
	                }
	            }
	        }
	        return new ActiveXObject(arguments.callee.activeXString);	
    	}
    } else {
    	return function(){
    		throw new Error("No XHR object available");
    	}  
    }
})();
console.log(createXHR);


//函数柯里化
function add(num1,num2){
	return num1+num2;
}
function curriedAdd(num2){
	return add(5,num2);
}
console.log(add(2,3));//5
console.log(curriedAdd(3));//8

//通式
function curry(fn){
	//把调用方法的参数截取出来
	var args=Array.prototype.slice.call(arguments,1);
	return function(){
		//目的是将arguments对象的数组提出来转化为数组
		var innerArgs=Array.prototype.slice.call(arguments);
		var finalArgs=args.concat(innerArgs);
		return fn.apply(null,finalArgs);
	};
}

var curriedAdd2=curry(add,5,12);
console.log(curriedAdd2());

