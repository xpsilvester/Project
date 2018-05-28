/*
新建正则表达式

方式一：直接量语法

var reg = /pattern/attributes

方式二：创建 RegExp 对象的语法

 var reg = new RegExp(pattern, attributes);

参数说明：

参数 pattern 是一个字符串，指定了正则表达式的模式或其他正则表达式。 
参数 attributes 是一个可选的字符串，包含属性 “g”、”i” 和 “m”，分别用于指定全局匹配、
区分大小写的匹配和多行匹配。ECMAScript 标准化之前，不支持 m 属性。如果 pattern 是正则表达式，
而不是字符串，则必须省略该参数。

两者区别在于： 
1.采用直接量语法新建的正则表达式对象在代码编译时就会生成，是平常开发中常用的方式； 
2.采用构造函数生成的正则对象要在代码运行时生成。

正则表达式使用： 
正则对象的方法是指这样使用的： RegExp对象.方法(字符串) 
字符串对象的方法是这样使用：字符串.方法(RegExp对象)

正则对象的属性和方法

属性

ignoreCase 返回布尔值，表示RegExp 对象是否具有标志 i
global 返回布尔值，表示RegExp对象是否具有标志g
multiline 返回布尔值，表示RegExp 对象是否具有标志 m。
lastIndex 一个整数，标识开始下一次匹配的字符位置
source 返回正则表达式的源文本（不包括反斜杠）

i 执行对大小写不敏感的匹配

g 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
m 执行多行匹配
正则表达式作用

通常用于两种任务：

1.验证 
用于验证时，通常需要在前后分别加上^和$，以匹配整个待验证字符串；

2.搜索替换 
搜索/替换时是否加上此限定则根据搜索的要求而定，此外，也有可能要在前后加上\b而不是^和$

字符类匹配

[…] 查找方括号之间的任何字符
[^…] 查找任何不在方括号之间的字符
[a-z] 查找任何从小写 a 到小写 z 的字符
[A-Z] 查找任何从大写 A 到大写 Z 的字符
[A-z] 查找任何从大写 A 到小写 z 的字符
. 查找单个字符，除了换行和行结束符
\w 查找单词字符，等价于[a-zA-Z0-9]
\W 查找非单词字符，等价于[^a-zA-Z0-9]
\s 查找空白字符
\S 查找非空白字符
\d 查找数字，等价于[0-9]
\D 查找非数字字符，等价于[^0-9]
\b 匹配单词边界
\r 查找回车符
\t 查找制表符
\0 查找 NULL 字符
\n 查找换行符

重复字符匹配

{n,m} 匹配前一项至少n次，但不能超过m次
{n,} 匹配前一项n次或更多次
{n} 匹配前一项n次
n？ 匹配前一项0次或者1次，也就是说前一项是可选的，等价于{0，1}
n+ 匹配前一项1次或多次，等价于{1，}
n* 匹配前一项0次或多次，等价于{0，}
n$ 匹配任何结尾为 n 的字符串
^n 匹配任何开头为 n 的字符串
?=n 匹配任何其后紧接指定字符串 n 的字符串
?!n 匹配任何其后没有紧接指定字符串 n 的字符串

匹配特定数字

^[1-9]\d*$　 　 匹配正整数
^-[1-9]\d*$ 　 匹配负整数
^-?[0-9]\d*$　　 匹配整数
^[1-9]\d*|0$　 匹配非负整数（正整数 + 0）
^-[1-9]\d*|0$　　 匹配非正整数（负整数 + 0）
^[1-9]\d*.\d*|0.\d*[1-9]\d*$　　匹配正浮点数
^-([1-9]\d*.\d*|0.\d*[1-9]\d*)$　匹配负浮点数
^-?([1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0)$　 匹配浮点数
^[1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0$　　 匹配非负浮点数（正浮点数 + 0）
^(-([1-9]\d*.\d*|0.\d*[1-9]\d*))|0?.0+|0$　　匹配非正浮点数（负浮点数 + 0）

匹配特定字符串

^[A-Za-z]+$　　匹配由26个英文字母组成的字符串
^[A-Z]+$　　匹配由26个英文字母的大写组成的字符串
^[a-z]+$　　匹配由26个英文字母的小写组成的字符串
^[A-Za-z0-9]+$　　匹配由数字和26个英文字母组成的字符串
^\w+$　　匹配由数字、26个英文字母或者下划线组成的字符串
*/

//test检索字符串中指定的值。返回 true 或 false。 
var reg=/abc/g;
var str="123abc456abc";
console.log(reg.lastIndex);//0
console.log(reg.test(str));//true
console.log(reg.lastIndex);//6
console.log(reg.test(str));//true
console.log(reg.lastIndex);//12
console.log(reg.test(str));//false

//如果正则表达式是一个空字符串，则会匹配所有的字符串，
//但需要使用new RegExp()方式
console.log(new RegExp('').test('abc'));//true
console.log(/''/.test('abc'));//false
console.log(/''/.test("''"));//true

//exec() 方法用于检索字符串中的正则表达式的匹配。
//返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。
var str = "xyz";
var reg1=/x/;
var reg2=/a/;
var res1=reg1.exec(str);//["x", index: 0, input: "xyz", groups: undefined]
var res2=reg2.exec(str);//null
console.log(res1);
console.log(res2);

//如果正则表达式包含圆括号，则返回的数组会包括多个元素。
//首先是整个匹配成功的结果，后面是圆括号里匹配成功的结果，
//如果有多个圆括号，他们的匹配成功的结果都会成为数组元素
var str = 'abcdabc';
var reg = /(a)b(c)/;
var res = reg.exec(str);
console.log(res);//["abc", "a", "c", index: 0, input: "abcdabc"]

/*
对于调用exec方法后返回的数组具有以下两个属性：
input 整个原待匹配的字符串
index 整个模式匹配成功的开始位置
支持正则表达式的 String 对象的方法
*/

//search方法
/*
search()方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。

返回值： stringObject 中第一个与 regexp 相匹配的子串的起始位置。

注释：如果没有找到任何匹配的子串，则返回 -1。

search() 方法不执行全局匹配，它将忽略标志 g。它同时忽略 regexp 的 lastIndex 属性，
并且总是从字符串的开始进行检索，这意味着它总是返回 stringObject 的第一个匹配的位置。
*/

var str="abcdcef";
console.log(str.search(/c/g));//2

//match方法
/*match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
该方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值，而不是字符串的位置。

字符串对象的match方法与正则对象的exec方法比较类似：

但是如果正则表达式带有g修饰符，那么match方法与exec方法就有差别了:

可以看到match返回了所有成功匹配的结果，但是exec方法只返回了一个。 
*/
var str = "abcd";
var reg1 = /a/;
var reg2 = /x/;
console.log(str.match(reg1));//["a", index: 0, input: "abcd"]
console.log(str.match(reg2));//null

var str = "abcdabc";
var reg = /a/g;
console.log(str.match(reg));//["a", "a"]
console.log(reg.exec(str));//["a", index: 0, input: "abcdabc"]

//replace方法
/*
replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

返回值：一个新的字符串，是用 replacement 替换了 regexp 的第一次匹配或所有匹配之后得到的。

字符串 stringObject 的 replace() 方法执行的是查找并替换的操作。它将在 stringObject 中查找
与 regexp 相匹配的子字符串，然后用 replacement 来替换这些子串。如果 regexp 具有全局标志 g，
那么 replace() 方法将替换所有匹配的子串。否则，它只替换第一个匹配子串。
*/
 var str = "xxx";
 console.log(str.replace('x','y'));//yxx
 console.log(str.replace(/x/,'y'));//yxx
 console.log(str.replace(/x/g,'y'));//yyy

 //用子表达式替换：$1和$2
 //正则表达式中()就是一个子表达式，$1对应是第一个表达式的内容，即java，$2为script
 var str = "javascript";
 console.log(str.replace(/(java)(script)/,'$2$1')); //输出：scriptjava 
 //$& 为正则表达式匹配的字符串
 //正则表达式通过直接量java来匹配，匹配结果为java，则 $&的值为java，然后用字符串$&-来替换匹配的字符串
 var str1 = "javascript";
 console.log(str1.replace(/java/,'$&-')); //输出：java-script

 var str2 = "javascript";
 // $`为匹配子串ava的左侧文本，则为j
 console.log(str2.replace(/ava/,"$`")); //输出：jjscript
 // $'为匹配子串ava的右侧文本，则为script
 console.log(str2.replace(/ava/,"$'")); //输出：jscriptscript
 // $$为直接量符号，即插入一个$符号
 console.log(str2.replace(/ava/,"$$"));//输出：j$script

function replacer(match, a1, a2, a3, index, string) {
 	return [a1, a2, a3].join(' ~ ');
}
 var str = 'xyz45678%$&^';
 var reg = /([^\d]*)(\d*)([^\w]*)/
var res = str.replace(reg, replacer); 
console.log(res);//xyz ~ 45678 ~ %$&^

//split方法
//split(‘字符串的分割正则','返回数组的最大成员数')；
//返回分割后各部分组成的数组 

var str = 'a,b , c,d';
var res = str.split(",");//以逗号来分割字符串
console.log(res);//["a", "b ", " c", "d"]

var str1 = 'a,b , c,,d';
var res1 = str1.split(/,*/);//以0或多个逗号来分割字符串
console.log(res1);//["a", "b", " ", " ", "c", "d"]

var str2 = 'a, b,c, d';
var res2 = str2.split(/, */);//以0或对个逗号空格来分割字符串
console.log(res2);//["a", "b", "c", "d"]

var str3 = 'a, b,c, d';
var res3 = str3.split(/, */,2);//以0或对个逗号空格来分割字符串，同时限制返回数组中最多有两项
console.log(res3);//["a", "b"]

//可以变换正则的匹配规则来分割字符串。分割

//下面正则的匹配规则是以0或多个x来进行分割，
//如果加上括号则括号匹配的部分也就是分割规则也会作为数组成员返回。

var str = "x@@xx@xx@@";
var res = str.split(/x*/);//以0或者对个x为分隔符
console.log(res);//["", "@", "@", "@", "@", "@"]

var res1 = str.split(/(x*)/);//如果加上括号则括号匹配的部分也就是分割规则也会作为数组成员返回
console.log(res1);//["", "x", "@", "", "@", "xx", "@", "xx", "@", "", "@"]

//正则表达式的一些应用

/*
1.字符串中出现次数最多的字符
var re = /(\w)\1+/g; 
(\w)外面的圆括号表示分组,\1表示重复第一分组中的内容 ，\1+表示 \w匹配到的字符重复n次，
后面的g表示执行全部替换str.replace的第二个参数是个函数,参数a表示整个匹配到的字符串，
b表示第一捕获分组也就是出现重复的单个字符 ，将a.length 与已经记录 过的最多重复num比较，
如果a.length 更大，就将它赋值给num,用value记录重复字符 b，这个函数返回的是替换文本，
但这里没有返回值，也就是说替换 为空，每次替换这个函数都被执行
*/

