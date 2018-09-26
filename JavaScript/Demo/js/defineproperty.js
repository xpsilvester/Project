/*创建/修改/获取属性的方法
Object.defineProperty()
方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
如果不指定configurable, writable, enumerable ，
则这些属性默认值为false，如果不指定value, get, set，则这些属性默认值为undefined
语法: Object.defineProperty(obj, prop, descriptor)
obj: 需要被操作的目标对象
prop: 目标对象需要定义或修改的属性的名称
descriptor: 将被定义或修改的属性的描述符
*/
var obj=new Object();

Object.defineProperty(obj,'name',{
	configurable:false,
	writable:true,
	enumerable:true,
	value:'张三'
})

console.log(obj.name);//张三

/*
Object.defineProperties()
功能:方法直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象。
语法: Object.defineProperties(obj, props)
obj: 将要被添加属性或修改属性的对象
props: 该对象的一个或多个键值对定义了将要为对象添加或修改的属性的具体配置
*/

var obj=new Object();
Object.defineProperties(obj,{
	name:{
		value:'张三',
		configurable:false,
		writable:true,
		enumerable:true
	},
	age:{
		value:18,
		configurable:true
	}
})

console.log(obj.name,obj.age);//张三,18

/*
Object.getOwnPropertyDescriptor()
功能:
该方法返回指定对象上一个自有属性对应的属性描述符。
（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
Object.getOwnPropertyDescriptor(obj, prop)
obj: 需要查找的目标对象
prop: 目标对象内属性名称
*/

var person = {
    name: '张三',
    age: 18
}

var desc = Object.getOwnPropertyDescriptor(person, 'name'); 
console.log(desc) 
// {
//     configurable: true,
//     enumerable: true,
//     writable: true,
//     value: "张三"
// }

/*
Object. getOwnPropertyDescriptors()
功能:所指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。
语法: Object.getOwnPropertyDescriptors(obj)
obj: 需要查找的目标对象
*/
var person = {
    name: '张三',
    age: 18
}
var desc = Object.getOwnPropertyDescriptors(person, 'name');
console.log(desc)