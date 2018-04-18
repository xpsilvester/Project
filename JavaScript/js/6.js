//'use strict';

//数据属性
//修改属性默认特性
var person={};
Object.defineProperty(person,"name",{
	writable:false,
	value:"Nicholas"
});
console.log(person.name);//Nicholas
person.name="Greg";//非严格模式赋值会被忽略，严格模式直接报错
console.log(person.name);//Nicholas

Object.defineProperty(person,"name",{
	configurable: false//不可配置
});
console.log(person.name);//Nicholas
delete person.name;//非严格模式删除会被忽略，严格模式直接报错
console.log(person.name);//Nicholas

//*一旦属性定义为不可配置(configurable: false)的，就不能再把它变回可配置了，
//再配置会报错

//访问器属性

var book={
	_year:2004,
	edition:1
};

Object.defineProperty(book,"year",{
	get:function(){
		return this._year;
	},
	set:function(newValue){
		if(newValue > 2004){
			this._year = newValue;
			this.edition+=newValue-2004;
		}
	}
})

book.year=2005;
console.log("_year:"+book._year+";edition:"+book.edition);//_year:2005;edition:2

//Object.defineProperties():可以通过描述符一次定义多个属性

var book={};
Object.defineProperties(book,{
	_year:{
		value:2004
	},
	edition:{
		value:1
	},
	year:{
		get:function(){
			return this._year;
		},
		set:function(newValue){
			if(newValue>2004){
				this._year=newValue;
				this.edition+=newValue-2004;
			}
		}
	}
});
console.log(book);//{_year: 2004, edition: 1}

//读取属性的特性
var descriptor=Object.getOwnPropertyDescriptor(book,"_year");
console.log(descriptor.value);//2004
console.log(descriptor.configurable);//false
console.log(typeof descriptor.get);//undefined

var descriptor=Object.getOwnPropertyDescriptor(book,"year");
console.log(descriptor.value);//undefined
console.log(descriptor.configurable);//false
console.log(typeof descriptor.get);//function


//对象
//工厂模式
function createPerson(name,age,job){
	var o=new Object();
	o.name=name;
	o.age=age;
	o.job=job;
	o.sayName=function(){
		console.log(this.name);
	}
	return o;
}

var person1=createPerson("Nicholas",23,"Software Engineer");
var person2=createPerson("Greg",27,"Doctor");

console.log(person1);//{name: "Nicholas", age: 23, job: "Software Engineer", sayName: ƒ}
console.log(person2);//{name: "Greg", age: 27, job: "Doctor", sayName: ƒ}

//构造函数模式
function Person(name,age,job){
	this.name = name;
	this.age=age;
	this.job=job;
	this.sayName=function(){
		console.log(this.name);
	}
}
var person1=new Person("Nicholas",29,"Software Engineer");
var person2=new Person("Greg",27,"Doctor");

console.log(person1);//Person {name: "Nicholas", age: 29, job: "Software Engineer", sayName: ƒ}
console.log(person2);//Person {name: "Greg", age: 27, job: "Doctor", sayName: ƒ}
console.log(person1 instanceof Object);//true

person1.sayName();//Nicholas

Person("Greg",27,"Doctor");
window.sayName();//Greg

var o=new Object();
Person.call(o,"Kristen",25,"Nurse");
o.sayName();//Kristen

//原型模式
function PerP(){}
PerP.prototype.name="Nicholas";
PerP.prototype.age=29;
PerP.prototype.job="Software Engineer";
PerP.prototype.sayName=function(){
	console.log(this.name);
}
var per1=new PerP();
per1.sayName();

var per2=new PerP();
per2.sayName();//Nicholas

console.log(per1.sayName==per2.sayName);//true
console.log(PerP.prototype.isPrototypeOf(per1));//true
console.log(PerP.prototype.isPrototypeOf(per2));//true

console.log(Object.getPrototypeOf(per1) == PerP.prototype);//true
console.log(Object.getPrototypeOf(per1).name);//Nicholas

console.log(per1.name);//Nicholas
per1.name="Greg";
console.log(per1.name);//Greg

delete per1.name;
console.log(per1.name);//Nicholas

//hasOwnProperty():检测一个属性是存在与实例中，还是存在与原型中
console.log(per1.hasOwnProperty("name"));//false
per1.name="Greg";
console.log(per1.hasOwnProperty("name"));//true

delete per1.name;
console.log(per1.hasOwnProperty("name"));//false
console.log("name" in per1);//true


//组合使用构造函数模式和原型模式
function Pers(name,age,job){
	this.name=name;
	this.age=age;
	this.job=job;
	this.friends=["Shelby","Court"];
}
Pers.prototype={
	constructor:Pers,
	sayName:function(){
		console.log(this.name);
	}
}

var pers1=new Pers("Nicholas",29,"Software Engineer");
var pers2=new Pers("Greg",27,"Doctor");

pers1.friends.push("Van");
console.log(pers1.friends);//["Shelby", "Court", "Van"]
console.log(pers2.friends);//["Shelby", "Court"]
console.log(pers1.friends === pers2.friends);//false
console.log(pers1.sayName === pers1.sayName);//true

//动态原型模式
function Person3(name,age,job){
	//属性
	this.name=name;
	this.age=age;
	this.job=job;

	//方法
	if(typeof this.sayName != "function"){
		Person3.prototype.sayName=function(){
			console.log(this.name);
		}
	}
}
var friend=new Person3("Nicholas",29,"Software Engineer");
friend.sayName();//Nicholas

//寄生构造函数模式
function SpecialArray(){
	//创建数组
	var values=new Array();

	//添加值
	values.push.apply(values,arguments);

	//添加方法
	values.toPipedString=function(){
		return this.join("|");
	}

	//返回数组
	return values;
}
var colors=new SpecialArray("red","blue","green");
console.log(colors.toPipedString());//red|blue|green

//稳妥构造函数模式
function Person4(name,age,job){
	//创建要返回的对象
	var a=new Object();
	//在这里定义私有变量和函数
	
	//添加方法
	a.sayName=function(){
		console.log(name);
	}

	//返回对象
	return a;
}

var friend1=Person4("Nicholas",29,"Software Engineer");
friend1.sayName();//"Nicholas"

//继承
//原型链
function SuperType(){
	this.property=true;
}
SuperType.prototype.getSuperValue=function(){
	return this.property;
}
function SubType(){
	this.subproperty=false;
}

//通过创建SuperType实例继承了SuperType
SubType.prototype=new SuperType();


var instance=new SubType();
console.log(instance.getSuperValue());//true

console.log(instance instanceof Object);//true
console.log(instance instanceof SuperType);//true
console.log(instance instanceof SubType);//true

console.log(Object.prototype.isPrototypeOf(instance));//true
console.log(SuperType.prototype.isPrototypeOf(instance));//true
console.log(SubType.prototype.isPrototypeOf(instance));//true

//给原型添加方法的代码一定要放在替换原型的语句之后
//添加新方法
SubType.prototype.getSubValue=function(){
	return this.subproperty;
};
//重写超类型中的方法
SubType.prototype.getSuperValue = function(){
	return false;
}

console.log(instance.getSuperValue());//false

var instance1=new SuperType();
console.log(instance1.getSuperValue());//true

//不能使用对象字面量创建原型方法，这样会重写原型链
//会导致SubType.prototype=new SuperType();无效
/*
SubType.prototype={
	getSubValue:function(){
		return this.subproperty;
	},

	someOtherMethod:function(){
		return false;
	}
}
*/
//问题:资源共享浪费
function SuperType1(){
	this.colors=["red","blue","green"];
}

function SubType1(){}

SubType1.prototype=new SuperType1();

var instance2=new SubType1();
instance2.colors.push("black");
console.log(instance2.colors);//["red", "blue", "green", "black"]

var instance3=new SubType1();
console.log(instance3.colors);//["red", "blue", "green", "black"]

//借用构造函数
function SuperType2(){
	this.colors=["red","blue","green"];
}

function SubType2(){
	//继承了SuperType1
	SuperType2.call(this);
}

var instance1=new SubType2();
instance1.colors.push("black");
console.log(instance1.colors);//["red", "blue", "green", "black"]

var instance2=new SubType2();
console.log(instance2.colors);//["red", "blue", "green"]

//传递参数
function SuperType3(name){
	this.name=name;
}
function SubType3(){
	//继承了SuperType3,同时还传递了参数
	SuperType3.call(this,"Nicholas");

	//实例属性
	this.age=29;
}

var instace3=new SubType3();
console.log(instace3.name);//Nicholas
console.log(instace3.age);//29

//组合继承
function SuperType4(name){
	this.name=name;
	this.colors=["red","blue","green"];
}

SuperType4.prototype.sayName=function(){
	console.log(this.name);
};

function SubType4(name,age){
	//继承属性
	SuperType4.call(this,name);
	this.age=age;
}

//继承方法
SubType4.prototype=new SuperType4();

SubType4.prototype.sayAge=function(){
	console.log(this.age);
}

var instance4=new SubType4("Nicholas",29);
instance4.colors.push("black");
console.log(instance4.colors);//["red", "blue", "green", "black"]
instance4.sayName();//Nicholas
instance4.sayAge();//29

var instance5=new SubType4("Greg",27);
console.log(instance5.colors);//["red", "blue", "green"]
instance5.sayName();//Greg
instance5.sayAge();//27

//原型式继承
var person10={
	name:"Nicholas",
	friends:["Shelby","Court","Van"]
}

var anotherPerson=Object.create(person10);
anotherPerson.name="Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson=Object.create(person10);
yetAnotherPerson.name="Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person10.friends);//["Shelby", "Court", "Van", "Rob", "Barbie"]
console.log(person10.name);//Nicholas
console.log(anotherPerson.name);//Greg

//寄生组合式继承,只调用了一次超类v
function object(o){
	function F(){}
	F.prototype=o;
	return new F();
}
function inheritPrototype(subType,superType){
	var prototype=object(superType.prototype);//创建对象
	prototype.constructor=subType;//增强对象
	subType.prototype=prototype;//指定对象
}

function SuperType5(name){
	this.name=name;
	this.colors=["red","blue","green"];
}

SuperType5.prototype.sayName=function(){
	console.log(this.name);
};

function SubType5(name,age){
	//继承属性
	SuperType4.call(this,name);
	this.age=age;
}

inheritPrototype(SubType5,SuperType5);

SubType5.prototype.sayAge=function(){
	console.log(this.age);
}