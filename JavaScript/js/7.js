var createFunctions;

createFunctions=function(){
	var result =new Array();
	for(var i=0;i<10;i++){
		result[i]=function(){
			return i;
		};
	}
	return result;
}
console.log(createFunctions());//[ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ]

//闭包
createFunctions=function(){
	var result=new Array();
	for(var i=0;i<10;i++){
		result[i]=function(num){
			return num
		}(i);
	}
	return result;
}

console.log(createFunctions());//[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

//匿名函数的执行环境具有全局性，this通常指向window
var name="The Window";
var object={
	name:"My Object",
	getNameFunc:function(){
		return function(){
			return this.name;
		}
	}
}
console.log(object.getNameFunc()());//The Window

var obj={
	name:"My Obj",
	getNameFunc:function(){
		var $this=this;
		return function(){
			return $this.name;
		};
	}
}
console.log(obj.getNameFunc()());//My Obj

var object1={
	name:"My Object1",

	getName:function(){
		console.log(this.name);
	}
}
object1.getName();//My Object1
(object1.getName)();//My Object1
(object1.getName = object1.getName)();//The Window

(function(){
	//这里是块级作用域
})();

var someFunction=function(){
	//这里是块级作用域
};
someFunction();

function MyObject(){
	//私有变量和私有函数
	var privateVariable=10;

	function privateFunction(){
		return false;
	}

	//特权方法
	this.publicMethod=function(){
		privateVariable++;
		console.log(privateFunction());
	};
}
var objd=new MyObject();
objd.publicMethod();//false

var Person=function(name){
	this.getName=function(){
		return name;
	};
	this.setName=function(value){
		name=value;
	};
}

var person=new Person("Nicholas");
console.log(person.getName());//Nicholas
person.setName("Greg");
console.log(person.getName());//Greg

//静态私有变量
(function(){
	//私有变量和私有函数
	var privateVariable=10;

	function privateFunction(){
		return false;
	}

	//构造函数
	MyObject=function(){};

	//公有/特权方法
	MyObject.prototype.publicMethod=function(){
		privateVariable++;
		return privateFunction();
	}
})();

var testObj=new MyObject();
console.log(testObj.publicMethod());//false

(function(){
	var name="";
	Person1=function(value){
		name=value;
	};
	Person1.prototype.getName=function(){
		return name;
	};
	Person1.prototype.setName=function(value){
		name=value;
	}
})();

var person1=new Person1("Nicholas");
console.log(person1.getName());//Nicholas
person1.setName("Greg");
console.log(person1.getName());//Greg

var person2=new Person1("Michael");
console.log(person1.getName());//Michael
console.log(person2.getName());//Michael

//单例
var singleton=function(){
	//私有变量和私有函数
	var privateVariable=10;

	function privateFunction(){
		return false;
	}

	//特权/公有方法和属性
	return {
		publicProperty:true,
		publicMethod:function(){
			privateVariable++;
			return privateFunction();
		}
	}

}();

var application=function(){
	//私有变量和函数
	var components=new Array();
	//初始化
	components.push(singleton);
	//公共
	return {
		getComponetCount:function(){
			return components.length;
		},
		registerComponent:function(component){
			if(typeof component == "object"){
				components.push(component);
			}
		}
	}
}();

var listSingleton=singleton;
console.log(listSingleton.publicProperty);//true
listSingleton.publicProperty=false;
console.log(listSingleton.publicProperty);//false
console.log(singleton.publicProperty);//false
console.log(application.getComponetCount());//1

//增强的模块模式
var CustomType=function(){};
var singleton1=function(){
	//私有变量和私有函数
	var privateVariable=10;
	function privateFunction(){
		return false;
	}

	//创建对象
	var object=new CustomType();

	//添加特权/公有属性和方法
	object.publicProperty=true;

	object.publicMethod=function(){
		privateVariable++;
		return privateFunction();
	};
	//返回这个对象
	return object;
}();

var application1=function(){
	//私有变量和函数
	var components=new Array();
	//初始化
	components.push(singleton1);

	//创建application1的一个副本
	var app=singleton1;
	//公共接口
	app.getComponetCount=function(){
		return components.length;
	};

	app.registerComponent=function(component){
		if(typeof component=="object"){
			components.psuh(component);
		}
	};

	//返回这个副本
	return app;

}();

var listSingleton1=singleton1;
console.log(listSingleton1.publicProperty);//true
listSingleton1.publicProperty=false;
console.log(listSingleton1.publicProperty);//false
console.log(singleton1.publicProperty);//false
console.log(application1.getComponetCount());//1

