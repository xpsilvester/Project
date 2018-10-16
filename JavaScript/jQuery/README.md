# jQuery源码分析

---

### 一、jQuery版本
##### jQuery一共13个模块，从2.1版开始jQuery支持通过AMD模块划分，jQuery在最开始发布的1.0版本是很简单的，只有CSS选择符、事件处理和AJAX交互3大块。其发展过程中，有几次重要的变革:
☑  1.2.3 版发布，引入数据缓存，解决循环引用与大数据保存的问题

☑  1.3 版发布，它使用了全新的选择符引擎Sizzle，在各个浏览器下全面超越其他同类型JavaScript框架的查询速度，程序库的性能也因此有了极大提升

☑  1.5 版发布，新增延缓对像(Deferred Objects)，并用deferred重写了Ajax模块

☑  1.7 版发布，抽象出回调对象，提供了强大的的方式来管理回调函数列表。

### 二、jquery3.0 新特性
1.移除旧的IE工作区

新的最终版最主要的目标是更加快速，更加时尚，因此，那些支持早于IE9版本的相关技术与工作区都被移除了。这意味着如果你想要或者需要支持IE6-8，你必须用回1.12版本，因为甚至是2.X版本都无法完整支持早于IE9的浏览器。

2.jQuery 3.0运行在Strict Mode下
大多数支持jQuery 3的浏览器都支持strict mode，而在本次更新中对此进行了规定。

虽然jQuery 3是写在strict mode中的，但是你需要了解的是你的代码并不需要运行在strict mode中，因此如果你想要把以前的代码迁移到jQuery 3，你不需要对已存在的jQuery代码进行重写。Strict和non-strict mode的JavaScript代码可以和谐共存。

这里有一些例外：某些版本的ASP.NET，因为strict mode的缘故，无法与jQuery 3兼容，如果你的代码涉及到了ASP.NET，你可以查看关于strict mode的细节。

3.引进for...of循环
jQuery 3支持for...of语句，这是由ECMAScript 6中新引进的一种for循环语句。这提供了对Arrays，Maps和Sets这样的可迭代对象一种更直接的遍历方法。

在jQuery中，for...of循环可以取代以前的$.each(...)语法，并且更容易通过jQuery的元素集合进行循环。

4.动画方面采用新的API
jQuery 3使用requestAnimationFrame() API来执行动画，使动画运行得更加顺畅、快速。新的API只用于支持它的浏览器，对于那些更老的浏览器（如IE9）jQuery使用先前的API来作为显示动画的后备方案。

RequestAnimationFrame已经推出一段时间了，如果你对如何使用它以及什么时候使用它感兴趣，CSS Tricks上有一篇很好的文章可供你阅读。

5.对包含特殊含义的字符串提供转义的新方法
新的jQuery.escapeSelector()提供了对在CSS中存在特殊含义的字符串或字符进行转义的方法，该方法可使这些字符串或字符能够继续用于jQuery选择器中，而无需对那些无法进行正确理解的JavaScript解释器进行转义。

这个示例可以让你更好的了解这个全新的方法：

举个例子，页面中某个ID为“abc.def”的元素由于选择器将其解析为ID为“abc”且包含一个名为“def”的类的对象，而无法被```$( "#abc.def" )```选定。但是它可以由```$( "#" + $.escapeSelector( "abc.def"))``` 来进行选定。

我无法确定发生中情况的频率，但是假如你碰到过这种类似的情况，这无疑给了你一个解决该问题的简单方法。

6.类操作方法支持SVG
不幸的是，jQuery 3现在还无法完整的支持SVG，但是对于操作CSS类名称的jQuery方法，如.addClass()和.hasClass()现在可以将SVG文档作为目标。这意味着你可以修改（添加、删除、切换）或者查找SVG（可缩放矢量图形）下的jQuery类，然后使用CSS的类样式。（相关阅读：Styling Scalable Vector Graphic (SVG) with CSS）

 

7.延迟对象现在与JS Promises兼容
JavaScript Promises，用于异步计算的对象，现在在ECMAScript 6中已经被标准化；它们的运行状况和特性的详细说明参见Promises/A+标准。

在jQuery 3中，延迟对象已经与新的Promises/A+标准相兼容，延迟对象已经成为让创建回调队列成为可能的可链对象(chainable objects)。

新的特性改变了异步回调函数执行过程，Promises允许开发者编写在逻辑上与同步代码更接近的异步代码。

查看升级指南的代码示例，或者查看关于JavaScript Promises基础的Scotch.io教程可以让你了解更多的信息。

8.jQuery.when()对于多种参数的不同解读
$.when()提供了执行回调函数的一种方法，它成为了jQuery 1.5之后的一部分。这个方法非常灵活，它适用于零参数，也适用于一个或者多个作为参数的对象。

jQuery 3改变了当包含$.then()方法时对$.when()中参数的解读方法，你可以对$.when()进行额外的参数回调。

在jQuery 3中，如果你在$.when()中的then()方法内增加一个输入参数，该参数将会被解释成一个可与Promise兼容的"thenable"。

这意味着 $.when方法能够接收更加宽广的输入范围，比如原生的ES6 Promises和Bluebird Promises，这也使得编写更复杂的异步回调成为了可能。

9.新的显示/隐藏逻辑
为了增加响应式设计的兼容性，与元素显示和隐藏的代码在jQuery 3中进行了更新。

从现在开始，.show()、.hide()和.toggle()方法将会以内联样式为重点取代以前的计算样式，这种方式能够更尊重样式列表的改变。

新的代码尽可能的尊重样式列表中所呈现的数值，这意味着CSS规则可根据事件（如设备重新定位和窗口尺寸调整）进行动态改变。

这个说明文件申明了最重要的结果就是：

“作为结果，断开连接的元素除非指定了内联display: none，否则将不再认定为是隐藏的。因此，在jQuery 3.0中，.toggle()不再对断开连接元素与已连接元素进行区分。”

如果你想要更好的了解关于全新的显示/隐藏逻辑，这个Github discussion会对你有帮助。jQuery开发者还发布了Google文档表来展示在不同用例下新规则的运转。

10.对于防止XSS攻击的额外保护
jQuery 3增加一个额外的安全层用户用于防备跨站点脚本(XSS)攻击，它需要开发者指定$.ajax()和$.get()方法中的选项为dataType: "script"。

换言之，如果你想要执行跨站点的脚本请求，你必须在这些方法中作出这样的声明。

新的改变对于当“远程站点传递非脚本内容之后又提供有恶意脚本的服务内容”的情况是非常有效的。这个变化不会影响$.getScript()方法，因为它明确地设置了dataType: "script"选项。

### 三、对象的构建
面向对象(OOP)的语言都有一个特点，它们都会有类的这一概念，通过类可以抽象出创建具体相同方法与属性的对象。但是ECMAScript中是没有类的概念的，因此它的对象与基于类的语言如java的定义是有所不同的。

在JavaScript世界中函数作为“一等公民”，它不仅拥有一切传统函数的使用方式（声明和调用），而且可以做到像简单值一样赋值、传参、返回，这样的函数也称之为第一级函数。不仅如此，而且还可以通过操作符new来充当类的构造器。

函数在充当类的构造器时，原型prototype是一个重要的概念。prototype是构造函数的一个属性, 该属性指向一个对象。而这个对象将作为该构造函数所创建的所有实例的基引用(base reference), 可以把对象的基引用想像成一个自动创建的隐藏属性。 当访问对象的一个属性时, 首先查找对象本身, 找到则返回；若不, 则查找基引用指向的对象的属性(如果还找不到实际上还会沿着原型链向上查找,  直至到根)。 只要没有被覆盖的话, 对象原型的属性就能在所有的实例中找到。

类一：
```
function ajQuery() {
    this.name = 'jQuery';
    this.sayName = function(){
    return this.name
}
var a = new ajQuery()
var b = new ajQuery()
var c = new ajQuery()
```

类二:
```
function ajQuery() {
    this.name = 'jQuery'
}
ajQuery.prototype = {
    sayName: function() {
        return this.name
    }
}
var a = new ajQuery()
var b = new ajQuery()
var c = new ajQuery()
```
类一与类二产生的结构几乎是一样的，而本质区别就是：类二new产生的a、b、c三个实例对象共享了原型的sayName方法，这样的好处节省了内存空间，类一则是要为每一个实例复制sayName方法，每个方法属性都占用一定的内存的空间，所以如果把所有属性方法都声明在构造函数中，就会无形的增大很多开销，这些实例化的对象的属性一模一样，都是对this的引用来处理。除此之外类一的所有方法都是拷贝到当前实例对象上。类二则是要通过scope连接到原型链上查找，这样就无形之中要多一层作用域链的查找了。

jQuery对象的构建如果在性能上考虑，所以就必须采用原型式的结构：
```
jQuery = function( selector, context ) {
    return new jQuery.fn.init( selector, context );
}
jQuery.fn = jQuery.prototype = {
    init：function(){
    return this
},
    jquery: version,
    constructor: jQuery,
    ………………
}
var a = $() ;
```
使用原型结构，性能上是得到了优化，但是ajQuery类这个结构与目标jQuery的结构的还是有很大不一致：

☑   没有采用new操作符；

☑   return返回的是一个通过new出来的的对象 。

### 四、静态与实例方法共享设计

我们先看看jQuery在接口的设计：

遍历方法：
```
$(".aaron").each()   //作为实例方法存在
$.each()             //作为静态方法存在
```
这是最常见的遍历方法，第一条语句是给有指定的上下文调用的，就是(".aaron")获取的DOM合集，第二条语句$.each()函数可用于迭代任何集合，无论是“名/值”对象（JavaScript对象）或数组。在迭代数组的情况下，回调函数每次都会传递一个数组索引和相应的数组值作为参数。本质上来说2个都是遍历，那么我们是不是要写2个方法呢？

我们来看看jQuery的源码：
```
jQuery.prototype = {
    each: function( callback, args ) {
        return jQuery.each( this, callback, args );
    }
}
```
实例方法取于静态方法，换句话来说这是静态与实例方法共享设计，静态方法挂在jQuery构造器上，原型方法挂在哪里呢？

我们上节不是讲了内部会划分一个新的构造器init吗？jQuery通过new原型prototype上的init方法当作构造器，那么init的原型链方法就是实例的方法了，所以jQuery通过2个构造器划分2种不同的调用方式一种是静态，一种是原型。

方法是共享的，并且实例方法取于静态方法，2个构造器是完全隔离的 ,这个要如何处理？

看看jQuery给的方案：

画龙点睛的一处init.prototype = jQuery.fn，把jQuery.prototype原型的引用赋给jQuery.fn.init.prototype的原型，这样就把2个构造器的原型给关联起来了。
```
ajQuery.fn = ajQuery.prototype = {
        name: 'aaron',
        init: function(selector) {
               this.selector = selector;
               return this;
        },
        constructor: ajQuery
}
ajQuery.fn.init.prototype = ajQuery.fn
```
这段代码就是整个结构设计的最核心的东西了，有这样的一个处理，整个结构就活了！不得不佩服作者的设计思路，别具匠心。

看看init的的构造图：
![此处输入图片的描述][1]
通过原型传递解决问题，把jQuery的原型传递给jQuery.prototype.init.prototype。换句话说jQuery的原型对象覆盖了init构造器的原型对象，因为是引用传递所以不需要担心这个循环引用的性能问题。


#### 参考文章: https://www.cnblogs.com/hrw3c/p/5304849.html

[1]: https://img1.sycdn.imooc.com/540905880001daac05540230.jpg

