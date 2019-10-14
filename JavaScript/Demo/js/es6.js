/**
 * @param {string} digits
 * @return {string[]}
 */

 //2:abc ,3:def,4:ghi,5:jkl,6:mno,7:pqrs,8:tuv,9:wxyz
 var letterCombinations = function(digits) {
    let phoneArr = ['','','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz'],
        resultArr = [];
    let digitsArr = digits.split('').map(item => parseInt(item));
    for(let i=0;i<digitsArr.length;i++){
        resultArr = combination(phoneArr[digitsArr[i]],resultArr)
    }
    return resultArr
};

function combination(letter,arr){
    let newArr = [],
        letterArr = letter.split('');
    if(arr.length == 0){
        for(let i=0;i<letterArr.length;i++){
            newArr.push(letterArr[i])
        }
    }else{
        for(let i=0;i<letterArr.length;i++){
            for(let k=0;k<arr.length;k++){
                newArr.push(arr[k]+letterArr[i])
            }
        }
    }
    return newArr;
}


/**
 * @param {string} s
 * @return {boolean}
 */
// '('，')'，'{'，'}'，'['，']'
var isValid = function(s) {
    if(s.length % 2 != 0) return false;
    let sArr = s.split(''),
        temp = [],
        sArrMap = new Map();
    sArrMap.set(')','(');
    sArrMap.set(']','[');
    sArrMap.set('}','{');
    for(let i=0;i<sArr.length;i++){
        if(sArr[i] == '(' || sArr[i] == '{' || sArr[i] == '['){
            temp.push(sArr[i])
        }else{            
            if(temp[temp.length -1] == sArrMap.get(sArr[i])){
                temp.pop()
            }else{
                return false
            }
        }
    }
    if(temp.length > 0) return false;
    return true
};
//console.log(isValid("([)]"))


//node http模块应用

let httpUse = ()=>{
    let http = require('http');

    http.createServer((request,response)=>{
        response.writeHead(200,{'Content-Type':'text/palin'})
        console.log('request')
        response.end('Hello World\n')
    }).listen(8888)
}

//ES6 Symbol 
let symbolTest = ()=>{
    let mySymbol = Symbol();

    let a = {}
    a[mySymbol] = 'Hello!'

    let b = {
        [mySymbol] : 'Hello!'
    }

    let c = {}
    Object.defineProperty(c, mySymbol ,{value:'Hello! '})

    //console.log(a[mySymbol],b[mySymbol],c[mySymbol])

    const COLOR_RED = Symbol();
    const COLOR_GREEN = Symbol();

    let getComplement = color => {
        switch(color){
            case COLOR_RED:
                console.log('COLOR_RED');
                break;
            case COLOR_GREEN:
                console.log('COLOR_GREEN');
                break;
            default:
                throw new Error('Undefined color');
        }
    }
    //getComplement(COLOR_RED)

    const shapeType = {
        triangle: Symbol()
    }

    let getArea = (shape,options) => {
        let area = 0;
        switch(shape){
            case shapeType.triangle:
                area = 0.5 * options.width * options.height;
                break;
        }
        console.log(area)
    }
    //getArea(shapeType.triangle,{width:20,height:40})

    const obj = {a:'2132'}
    let a1 = Symbol('a1');
    let b1 = Symbol('b1');

    obj[a1] = 'Hello';
    obj[b1] = 'World';
    
    //console.log(Object.getOwnPropertySymbols(obj))
    //console.log(Reflect.ownKeys(obj))
    let size = Symbol('size');
    class Collection{
        constructor(){
            this[size] = 0;
        }
        add(item){
            this[this[size]] = item;
            this[size]++
        }

        get [Symbol.toStringTag]() {
            return 'class'
        }
        static sizeOf(instance){
            return instance[size];
        }
    }
    let x = new Collection();
    console.log(x.toString())
}
//symbolTest()

//Set
function setTest (){
    this.dedupe = arr => {
        return Array.from(new Set(arr))
    };
    this.keys = arr => {
        let set = new Set(arr);
        for(let item of set.keys()){
            console.log(item)
        }
    };
    this.values = arr => {
        let set = new Set(arr);
        for(let item of set.values()){
            console.log(item)
        }
    };
    this.entries = arr => {
        let set = new Set(arr);
        for(let item of set.entries()){
            console.log(item)
        }
    }
    this.forEach = arr => {
        let set = new Set(arr);
        set.forEach((val,key)=> console.log(key+':'+val))
    }
}
setTest.prototype.union = (arr1,arr2) => {
    return [...new Set([...arr1,...arr2])]
}
setTest.prototype.intersect = (set1,set2) => {
    return [...new Set([...set1].filter(x=> set2.has(x)))]
}
setTest.prototype.difference  = (set1,set2) => {
    return [...new Set([...set1].filter(x=> !set2.has(x)))]
}


let set1 = new setTest()
//console.log(set1.dedupe([1,2,3,4,4,4,4]))
//set1.keys(['red','green','blue'])
//set1.values(['red','green','blue'])
//set1.entries(['red','green','blue'])
//set1.forEach(['red','green','blue'])
//console.log(set1.union(['red','green','blue'],['yel']))
//console.log(set1.intersect(new Set(['red','green','blue']),new Set(['red'])))
//console.log(set1.difference(new Set(['red','green','blue']),new Set(['red'])))

const items = [
    ['name','张三'],
    ['title','Author']
]

const map = new Map();

items.forEach(([key,value])=> map.set(key,value))

//console.log(map)
//let arrA = ['a'];

//map.set(arrA,555)
//console.log(map.get(arrA))

function mapTest(){
    this.keys = ()=>{
        for(let key of map.keys()){
            console.log(key)
        }
    };
    this.values = ()=>{
        for(let val of map.values()){
            console.log(val)
        }
    };
    this.entries = ()=>{
        for (let [key, value] of map.entries()) {
            console.log(key, value);
        }
    }
    this.map = ()=>{
        for (let [key, value] of map) {
            console.log(key, value);
        }
    }
} 

function mapTest2(){
    this.keys = ()=>[...map.keys()];
    this.values = ()=>[...map.values()];
    this.entries = ()=>[...map.entries()];
    this.map = ()=>[...map]
} 

let map1 = new mapTest();
let map2 = new mapTest2();
//map1.keys()
//map1.values()
//map1.entries()
//map1.map()

// console.log(map2.keys())
// console.log(map2.values())
// console.log(map2.entries())
// console.log(map2.map())

mapTest.prototype.strMapToObj = strMap => {
    let obj = Object.create(null);
    for(let [k,v] of strMap){
        obj[k] = v;
    }
    return obj;
}
mapTest.prototype.objToStrMap = obj => {
    let strMap = new Map();
    for(let k of Object.keys(obj)){
        strMap.set(k,obj[k])
    }
    return strMap;
}

//console.log(map1.strMapToObj(map))
//console.log(map1.objToStrMap({yes: true, no: false}))

//Proxy
let proxyObj = new Proxy({},{
    get: function (target,key,receiver){
        console.log(`getting ${key}!`);
        return Reflect.get(target,key,receiver);
    },
    set: function (target,key,value,receiver){
        console.log(`setting ${key}!`)
        return Reflect.set(target,key,value,receiver)
    }
})

//proxyObj.count = 1

//++proxyObj.count

let proxyObj2 = new Proxy({},{
    get: function(target,property){
        return 35;
    }
})

let proxyobj = Object.create(proxyObj2);
//console.log(proxyobj.time)

let handler = {
    get: function(target,name){
        if(name === 'prototype'){
            return Object.prototype
        }
        return 'Hello, ' + name
    },
    apply: function(target,thisBinding,args){
        return args[0]
    },
    construct: function(target,args){
        return {value: args[1]}
    }
}

let fproxy = new Proxy(function(x,y){
    return x+y;
},handler);

// console.log(fproxy(1,2))
// console.log(new fproxy(1,2))
// console.log(fproxy.prototype === Object.prototype)
// console.log(fproxy.foo === "Hello, foo")

function createArray(...elements){
    let handler = {
        get(target,propKey,receiver){
            console.log(typeof propKey)
            let index = Number(propKey);
            if(index < 0){
                propKey = String(target.length + index);
            }
            return Reflect.get(target,propKey,receiver)
        }
    };
    let target = [];
    target.push(...elements);
    return new Proxy(target,handler)
}

//let proxyArr = createArray('a','b','c')
//console.log(proxyArr[-1])

var pipe = (function () {
    return function (value) {
      var funcStack = [];
      var oproxy = new Proxy({} , {
        get : function (pipeObject, fnName) {
          if (fnName === 'get') {
            return funcStack.reduce(function (val, fn) {
              return fn(val);
            },value);
          }
          funcStack.push(pipeObject[fnName]);
          return oproxy;
        }
      });
  
      return oproxy;
    }
  }());
  
  var double = n => n * 2;
  var pow    = n => n * n;
  var reverseInt = n => n.toString().split("").reverse().join("") | 0;

  //console.log(pipe(3).double.pow.reverseInt.get);

 let validator = {
     set: function(obj,prop,value){
         if(prop === 'age'){
             if(!Number.isInteger(value)){
                 throw new TypeError('The age is not an integer')
             }
             if(value > 200){
                 throw new RangeError('The age seems invalid')
             }
         }
         obj[prop] = value
     }
 }

 let person = new Proxy({},validator);

 //person.age = 100

 //person.age = 'young'

 //person.age = 300

 let handler2 = {
     apply (){
         return 'I am the proxy'
     }
 }

 let target2 = function () {
     return 'I am the target';
 }

 let p = new Proxy(target2,handler2);

 //console.log(p())

 let twice = {
     apply(target,ctx,args){
         return Reflect.apply(...arguments) * 2;
     }
 }
 function sum(left,right){
     return left + right;
 }
 let proxyObj3 = new Proxy(sum,twice);
 //console.log(proxyObj3(1, 2)) // 6
 //console.log(proxyObj3.call(null, 5, 6)) // 22
 //console.log(proxyObj3.apply(null, [7, 8])) // 30

 let myObject = {
     foo: 1,
     bar: 2,
     get baz(){
         return this.foo + this.bar;
     }
 }
 let myReceiverObject = {
     foo: 4,
     bar: 4
 }

 //console.log(Reflect.get(myObject,'baz',myReceiverObject))

 //console.log(Reflect.get(myObject,'foo'))

 const queuedObservers = new Set();
 const observe = fn => queuedObservers.add(fn);
 const observable = obj => new Proxy(obj,{set});

 function set(target,key,value,receiver){
     const result = Reflect.set(target,key,value,receiver);
     queuedObservers.forEach(observer => observer())
     return result
 }

 const person1 = observable({
    name: '张三',
    age: 20
  });
  
  function print() {
    console.log(`${person1.name}, ${person1.age}`)
  }
  
//   observe(print);
//   person1.name = '李四';
//   person1.age = 10

//Iterator 和 for...of 循环
  let makeIterator = array => {
      let nextIndex = 0;
      return {
          next: ()=>{
              return nextIndex < array.length ?
                {value:array[nextIndex++],done:false} : 
                {value: undefined, done: true}
          }
      }
  }

  let it = makeIterator(['a','b']);

//   console.log(it.next())
//   console.log(it.next())
//   console.log(it.next())

let obj2 = {
    data: ['hello','world'],
    [Symbol.iterator](){
        const self = this;
        let index = 0;
        return {
            next() {
                if(index < self.data.length){
                    return {
                        value: self.data[index++],
                        done: false
                    }
                } else {
                    return {value: undefined,done:true}
                }
            }
        }
    }
}

// for(let o of obj2){
//     console.log(o)
// }

let NodeList = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};

// for(let item of NodeList){
//     console.log(item)
// }

let someString = 'Hello';

let strIterator = someString[Symbol.iterator]()

// console.log(strIterator.next())
// console.log(strIterator.next())
// console.log(strIterator.next())

let obj3 = {
    [Symbol.iterator]: function* (){
        yield 1;
        yield 2;
        yield 3;
    }
}

//console.log([...obj3])

let obj4 = {
    * [Symbol.iterator](){
        yield 'hello';
        yield 'world';
    }
}

// for(let o of obj4){
//     console.log(o)
// }

//Generator
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

let hw = helloWorldGenerator()

// console.log(hw.next())
// console.log(hw.next())
// console.log(hw.next())
// console.log(hw.next())

let arr3 = [1,[[2,3],4],[5,6]]

let flat = function* (a){
    // a.forEach(function(item){
    //     if(typeof item !== 'number'){
    //         yield* flat(item)
    //     }else{
    //         yield item
    //     }
    // })
    let length = a.length;
    for(let i=0;i<length;i++){
        let item = a[i];
        if(typeof item !== 'number'){
            yield* flat(item)
        }else{
            yield item
        }
    }
}

// for(let f of flat(arr3)){
//     console.log(f)
// }

function* f1(){
    for(let i=0;true;i++){
        let reset = yield i;
        if(reset){i=-1}
    }
}

let g1 = f1();

// console.log(g1.next())
// console.log(g1.next())
// console.log(g1.next(true))
// console.log(g1.next())

function* dataConsumer(){
    console.log(`Started`);
    console.log(`1.${yield}`);
    console.log(`2.${yield}`);
    return `result`
}

let genObj = dataConsumer();

// genObj.next()
// genObj.next('a')
// genObj.next('b')

let wrapper = (generatorFunction)=>{
    return (...args)=>{
        let generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject
    }
}

let wrapped = wrapper(function* (){
    console.log(`First input: ${yield}`);
    return 'DONE'
})

//wrapped().next('Hello!')

function* fibonacci(){
    let [prev,curr] = [0,1]
    for(;;){
        yield curr;
        [prev,curr] = [curr,prev+curr]
    }
}

// for(let n of fibonacci()){
//     if(n > 1000) break;
//     console.log(n)
// }

function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);
  
    for (let propKey of propKeys) {
      yield [propKey, obj[propKey]];
    }
}
  
let jane = { first: 'Jane', last: 'Doe' };

// for (let [key, value] of objectEntries(jane)) {
//     console.log(`${key}: ${value}`);
// }

let delegatedIterator = (function* (){
    yield 'Hello!';
    yield 'Bye!';
}())

let delegatingIterator = (function* (){
    yield 'Greetings!';
    yield* delegatedIterator;
    yield 'Ok, bye.'
}())

// for(let value of delegatingIterator){
//     console.log(value)
// }

// 二叉树的构造函数
function Tree(left,label,right){
    this.left = left;
    this.label = label;
    this.right = right;
}

//中序（inorder）遍历函数
function* inorder(t){
    if(t){
        yield* inorder(t.left);
        yield t.label;
        yield* inorder(t.right)
    }
}

//生成二叉树
function make(array){
    //判断是否为叶节点
    if (array.length == 1) return new Tree(null, array[0], null);
    return new Tree(make(array[0]), array[1], make(array[2]));
}

let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

let result2 = [];
// 遍历二叉树
for(let node of inorder(tree)){
    result2.push(node)
}

//console.log(result2)

let clock = (function* (){
    while(true){
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
    }
})()

// clock.next()
// clock.next()
// clock.next()
// clock.next()

