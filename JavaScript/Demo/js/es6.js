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