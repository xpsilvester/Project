//查询字符串参数
function getQueryStringArgs(){
	//取得查询字符串并去掉开头的问号
	var qs=(location.search.length > 0 ? location.search.substring(1) : ""),
		//保存数据的对象
		args={},
		//取得每一项
		items=qs.length?qs.split("&"):[],
		item=null,
		name=null,
		value=null,
		//在for循环中使用
		i=0,
		len=items.length;
	//逐个将每一项添加到args对象中
	for(i=0;i<len;i++){
		item=items[i].split("=");
		name=decodeURIComponent(item[0]);
		value=decodeURIComponent(item[1]);

		if(name.length){
			args[name]=value;
		}
	}
	return args;
}

//在url后加上?id=10&content="skajewk"
console.log(getQueryStringArgs());//{id: "10", content: ""skajewk""}
console.log(location.search.substring(1))//"id=10&conten=%22skajewk%22"

//检测插件（在IE中无效）
function hasPlugin(name){
	name=name.toLowerCase();
	for(var i=0;i<navigator.plugins.length;i++){
		if(navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){
			return true;
		}
	}

	return false;
}

//检测Flash
console.log(hasPlugin("Flash"));

//检测QuickTime
console.log(hasPlugin("QuickTime"));

//检测IE中的插件
function hasIEPlugin(name){
	try{
		new ActiveXObject(name);
		return true;
	}catch(ex){
		return false;
	}
}

//检测IE中Flash
console.log(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));

//检测IE中QuickTime
console.log(hasIEPlugin("QuickTime.QuickTime"));

