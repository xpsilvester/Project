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









