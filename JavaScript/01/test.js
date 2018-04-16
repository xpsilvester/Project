//数据类型
console.log("111"); //111
var message= "some string";
var message1;
console.log(typeof message);//string
console.log(typeof 95+','+typeof null+","+typeof message1); //number,object,undefined
console.log(undefined == null); //true
console.log(undefined === null); //false
console.log(true == 1); //true
console.log(true === 1); //false
console.log(false == 0); //true
console.log(false === 0);//false
console.log(null == ""); //false
console.log(undefined == ""); //false

var message="false";
var messageAsBoolean=Boolean(message);
var mes;
var mesAsBoolean=Boolean(mes);
console.log(messageAsBoolean); //true 非空字符串 非零数字 任何对象 
console.log(mesAsBoolean); //false 空字符串 0和NaN null undefined

console.log(Number.MIN_VALUE); //最小值 5e-324
console.log(Number.MAX_VALUE); //最大值 1.7976931348623157e+308

console.log(NaN == NaN); //false NaN与任何值都不相等
console.log(isNaN(NaN)); //判断是否是NaN
console.log(isNaN("blue")); //true 不能转换成数值
console.log(isNaN("10")); //false 可以被转换成数值10

//同样适用于对象,首先自动调用对象的valueOf()方法，
//然后确定是否能转换为数值，如果不能，则再调用toString()方法再测试返回值
var numTest={num:10,unNum:"blue"};
console.log(isNaN(numTest.num)); //false 
console.log(isNaN(numTest.unNum)); //true

//数值转换 Number():转换任意数据类型,parseInt()、parseFloat()：专门用于把字符串转换成数值
console.log(Number("Hello World")+","+Number("")+","+Number("000011")+","+Number(true)+","+Number(false));//NaN,0,11,1,0

console.log(parseInt("1234blue")+","+parseInt("")+","+parseInt("0xA")+","+parseInt(22.5)+","+parseInt("070")+","+parseInt("0xf"));//1234,NaN,10,22,70,15

//String
console.log("letter sigma:\u03a3.");

//toString()
var age =11;
var ageAsString=age.toString(); 
console.log(ageAsString + ","+ typeof ageAsString);//"11",string
var found = true;
var foundAsString=found.toString();
console.log(foundAsString + ","+ typeof ageAsString)//"true",string

//String()
var value4;
console.log(String(10)+","+String(true)+","+String(null)+","+String(value4));//10,true,null,undefined

//操作符
//NOT
var num1=25; //00000000000000000000000000011001
var num2=~num1; //0000000000000000000000000000110 (反码)
console.log(num2); //-26
console.log(num2 + 1);//-25 负数等于本身的反码+1

//AND
var num3=25; //00000000000000000000000000011001
var num4=3; //00000000000000000000000000000011
console.log(num3 & num4); //1 00000000000000000000000000000001 两个都是1时返回1

//OR
console.log(num3 | num4);//27 00000000000000000000000000011011 有一个1时返回1

//XOR
console.log(num3 ^ num4);//26 00000000000000000000000000011010 只有一个1的时候才返回1

//左移
var oldValue=2; //00000000000000000000000000000010
console.log(oldValue << 5);//00000000000000000000000001000000 左移5位得64 *左移不会影响符号位

//右移
var oldValue=64; //00000000000000000000000001000000
console.log(oldValue >> 5) //00000000000000000000000000000010 右移5位得2

//无符号右移
console.log(oldValue >>> 5);//00000000000000000000000000000010 右移5位得2
var oldValue=-64;//11111111111111111111111111000000
console.log(oldValue >>> 5);//00000111111111111111111111111110 右移5位用0代替得134217726.符号变化

//匿名参数
function sayHi(){
	console.log(arguments[0]);//[0,"dhska",10]
	console.log(arguments[1]);//"haha"
	console.log(arguments.length);//2
}
sayHi([0,"dhska",10],"haha");

//没有重载，会被最后一个函数覆盖，只能通过arguments判断参数的数目和类型然后模拟重载
function chongzai(test1){
	console.log(test1);
}
function chongzai(test1,test2){
	console.log(test1);
	console.log(test2);
}
chongzai(1,2); //1;2;
chongzai(2);//1;undefined

function chongzai(){
	if(arguments.length==1){
		console.log(arguments[0]);
	}else if(arguments.length == 2){
		console.log(arguments[0]);
		console.log(arguments[1]);
	}else{
		return false;
	}
}
chongzai(1,2); //1;2;
chongzai(1); //1;
chongzai(1,1,1) //false;

//检测引用类型instanceof(检测基本类型用typeof)
var colors=['black','white','bule'];
console.log(colors instanceof Array);//true 引用类型都是Object实例,基本类型都不是对象
//基本数据类型：Undefined、Null、Boolean、Number和String
//引用类型：Object、Array、Date、RegExp、Function

//Object
function displayInfo(args){
	var output='';
	if(typeof args.name == 'string'){
		output+='Name: '+args.name + '\n';
	}
	if(typeof args.age == 'number'){
		output +='Age: '+args.age+'\n';
	}
	console.log(output);
}
displayInfo({
	name:'Nicholas',
	age:29
});
displayInfo({
	name:'Greg'
});

var person={name:'Nicholas',age:23}
var propertyName="name";
console.log(person.name);
console.log(person[propertyName]);//可以通过变量来访问

//Array
//检测数组
var colors=['black','blue','white'];
console.log(colors instanceof Array);//多个框架全局会存在问题
console.log(Array.isArray(colors));//最终确定到底是不是数组，不管是在哪个全局环境中创建的

//转换字符串方法
console.log(colors.toString());//"black,blue,white"
console.log(colors.toLocaleString());//"black,blue,white"
console.log(colors.valueOf());//["black", "blue", "white"]
console.log(colors);//["black", "blue", "white"]


//join()接收用作分隔符的字符串，然后返回包含所有数组项的字符串
console.log(colors.join(","));//black,blue,white
console.log(colors.join("||"));//black||blue||white

var person1={
	toLocaleString:function(){
		return "Nicholas";
	},
	toString:function(){
		return "Nicholas";
	}
}
var person2={
	toLocaleString:function(){
		return "Grigorios";
	},
	toString:function(){
		return "Greg";
	}
}
var people=[person1,person2];
console.log(people); 
console.log(people.toString()); //Nicholas,Greg
console.log(people.toLocaleString()); //Nicholas,Grigorios

//栈方法
var count=colors.push("red","green");//推入两项
console.log(count);//5
console.log(colors);//["black", "blue", "white", "red", "green"]

var item=colors.pop(); //取得最后一项
console.log(item); //green
console.log(colors.length); //4

var count1=colors.push(colors);
console.log(count1);//5
console.log(colors);//["black", "blue", "white", "red", Array(5)]
var item1=colors.pop();
console.log(item1);//["black", "blue", "white", "red"]

//队列方法
console.log(colors);// ["black", "blue", "white", "red"]
var item=colors.shift();
console.log(item);//black
console.log(colors);//["blue", "white", "red"]

//模拟反向队列
var count=colors.unshift("grey","voilet");
console.log(count);//5
console.log(colors);//["grey", "voilet", "blue", "white", "red"]

//重排序方法
var values=[1,2,3,4,5];
values.reverse();
console.log(values);//[5, 4, 3, 2, 1]

values.push(10);
values.unshift(20);
console.log(values);//[20, 5, 4, 3, 2, 1, 10]

values.sort();
console.log(values);//[1, 10, 2, 20, 3, 4, 5] 只能按照最前面的一位排序

//自写比较函数传给sort(),也可以用于比较字符串
function compare(value1,value2){
	// if(value1<value2){
	// 	return -1;
	// }else if(value1>value2){
	// 	return 1;
	// }else{
	// 	return 0;
	// }
	return value1 - value2;
}

values.sort(compare);
console.log(values);//[1, 2, 3, 4, 5, 10, 20] 

//操作方法
//concat(),先创建当前数组副本，然后将接收到的参数添加到这个副本末尾，最后返回新构建的数组
console.log(colors);//["grey", "voilet", "blue", "white", "red"]
var color2=colors.concat("yellow",["black","green"]);
console.log(colors);//["grey", "voilet", "blue", "white", "red"]
console.log(color2);//["grey", "voilet", "blue", "white", "red", "yellow", "black", "green"]

//slice(),基于当前数组中的一个或多个项创建一个新数组 ，参数传入起始位置
console.log(colors);//["grey", "voilet", "blue", "white", "red"]
var colors2=colors.slice(1);
var colors3=colors.slice(1, 4);
console.log(colors2);//["voilet", "blue", "white", "red"]
console.log(colors3);// ["voilet", "blue", "white"]

//splice() ,可用于删除(删除前两项splice(0,2))、插入(插入前两项splice(2,0,"red","green"))、替换(splice(2,1,"red","green"))
console.log(colors);// ["grey", "voilet", "blue", "white", "red"]
var removed=colors.splice(0,1);//删除第一项
console.log(removed);//["grey"]
console.log(colors);//["voilet", "blue", "white", "red"]

removed=colors.splice(1,0,"yellow","orange");//从位置1开始插入两项
console.log(removed);//[]
console.log(colors);//["voilet", "yellow", "orange", "blue", "white", "red"]

removed=colors.splice(1,1,"red","purple");//插入两项，删除一项(替换)
console.log(removed);//["yellow"]
console.log(colors);//["voilet", "red", "purple", "orange", "blue", "white", "red"]

//位置方法
var numbers=[1,2,3,4,5,4,3,2,1];
console.log(numbers.indexOf(4));//3
console.log(numbers.lastIndexOf(4));//5
console.log(numbers.indexOf(4,4));//5
console.log(numbers.lastIndexOf(4,4));//3

var person={name:"Nicholas"};
var people=[{name:"Nicholas"}];

var morePeople=[person];

console.log(people.indexOf(person));//-1
console.log(morePeople.indexOf(person));//0

//迭代方法

//every():对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true

console.log(numbers);//[1, 2, 3, 4, 5, 4, 3, 2, 1]

var everyResult=numbers.every(function(item,index,array){
	return (item > 2);
})
console.log(everyResult);//false

//some():只要传入的函数对数组中的某一项返回true，就会返回true
var someResult=numbers.some(function(item,index,array){
	return (item > 2);
})
console.log(someResult);//true

//filter():利用指定的函数确定是否在返回的数组中包含的某一项

var filterResult=numbers.filter(function(item,index,array){
	return (item > 2);
});
console.log(filterResult);//[3, 4, 5, 4, 3]

//map():返回一个数组，数组的每一项都是在原始数组中的对应项上运行传入函数的结果
var mapResult=numbers.map(function(item,index,array){
	return item * 2;
})
console.log(mapResult);//[2, 4, 6, 8, 10, 8, 6, 4, 2]

//forEach():对数组中的每一项运行传入的函数，无返回值
numbers.forEach(function(item,index,array){
	//执行某些操作
})

//缩小方法 IE9+、Firefox 3+、Safari 4+ 、Opera 10.5 和Chrome
//reduce():从数组第一项开始，逐个遍历到最后
//reduceRight():从数组的最后一项开始，向前遍历到第一项
//接受两个参数：一个在每一项上调用的函数和（可选）作为缩小基础的初始值，传给
//reduce和reduceRight的函数接受4个参数:前一个值，当前值，项的索引和数组对象
//这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上
var values=[1,2,3,4,5];
var sum=values.reduce(function(prev,cur,index,array){
	return prev+cur;
});
console.log(sum);//15

var sum=values.reduceRight(function(prev,cur,index,array){
	return prev+cur;
});
console.log(sum);//15




























