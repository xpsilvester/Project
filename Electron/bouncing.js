// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// 这个函数将两个数字作为参数传入，并且返回一个这两个数字之间的一个随机数。

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//通过一个对象实例化小球
function Ball(x,y,velX,velY,color,size){
	this.x=x;//最开始x坐标，坐标的范围从 0 （左上角）到浏览器视窗的宽和高（右下角）。
	this.y=y;//y坐标
	this.velX=velX;//水平速度— 我们会给每个小球一个水平和竖直速度。实际上，当我们让这些球开始运动时候，每过一帧都会给小球的 x 和 y 坐标加一次这些值。
	this.velY=velY;//竖直速度
	this.color=color;//颜色
	this.size=size;//每一个小球会有自己的大小 — 也就是小球的半径，以像素为单位。
}

//给小球的原型加上 draw( ) 方法
Ball.prototype.draw=function(){
	ctx.beginPath();//声明我们现在要开始在纸上画一个图形
	ctx.fillStyle=this.color;//定义这个形状的颜色 — 我们把这个加到小球的颜色属性
	ctx.arc(this.x,this.y,this.size,0,2*Math.PI);//在纸上画出一段圆弧。有这些参数：x 和 y 是 arc 中心的坐标 — 也就是小球的中心坐标,arc 的半径 — 小球的半径,最后两个参数是开始和结束的角度，也就是圆弧对应的夹角。这里我们用的是 0 和 2 * PI，也就是 360 度（如果你设置成 0 和 1 * PI，则只会出现一个半圆，也就是 180 度）
	ctx.fill();//声明我们结束了以 beginPath()开始的绘画,并且使用我们之前设置的颜色进行填充。
}

//用一个函数来进行更新球的位置
Ball.prototype.update=function(){
	//当球中心的X坐标+球半径>屏幕的宽时，横向速度变为反向
	if((this.x+this.size)>width){
		this.velX=-(this.velX);
	}

	//当球中心x坐标-球的半径<=0时（即屏幕最左侧），横向速度变为反向
	if((this.x-this.size)<=0){
		this.velX=-(this.velX);
	}

	//当球中心y坐标+球半径>屏幕的高时，竖直速度反向
	if((this.y+this.size)>=height){
		this.velY=-(this.velY);
	}

	//当球中心y坐标-球半径<=0时（即屏幕最下方），竖直速度反向
	if((this.y-this.size)<=0){
		this.velY=-(this.velY);
	}

	//球的移动
	this.x+=this.velX;
	this.y+=this.velY;
}

//给我们的项目加上撞击侦察，从而当小球撞击时代码可以察觉到。
Ball.prototype.collisionDetect=function(){
	//对于每个小球，我们都要检查其他的小球是否和当前这个小球相撞了。为了达到此目的，我们构造另外一个循环来遍历数组中的小球。
	//在循环里面，我们使用一个条件判断来检查当前遍历的小球是否与当前的小球相同。我们不希望检测到一个小球撞到了自己！为了达到这个目的，我们需要检查当前小球 (i.e., the ball whose collisionDetect method is being invoked) 是否和被循环到的小球 (i.e., the ball that is being referred to by the current iteration of the for loop in the collisionDetect method) 是不是同一个。我们使用 ！来否定判断，因此只有两个小球不是同一个时条件判断中的代码才会运行。
	//我们使用了一个常见的算法来检测两个小球是否相撞了，两个小球中心的距离是否小于量小球的半径之和。这些会在 2D collision detection 介绍地更加详细。
	//如果两个小球真的相撞了，会运行 if 下的代码。我们会将两个小球的颜色都设置成随机的一种。我们也可以将这步操作变得复杂一点，比如让两个小球弹开，那样需要植入更加复杂的代码。像这样的物理场景，有以下专门的库比如 PhysicsJS, matter.js, Phaser 等。
	for(var j=0;j<balls.length;j++){
		if(!(this===balls[j])){
			var dx=this.x-balls[j].x;
			var dy=this.y-balls[j].y;
			var distance=Math.sqrt(dx*dx+dy*dy);

			if(distance<this.size+balls[j].size){
				balls[j].color=this.color='rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
			}
		}
	}
}

//添加一个数组存储小球
var balls=[];

//定义一个函数，让动画循环
function loop(){
	ctx.fillStyle='rgba(0,0,0,0.25)';//将整个画布的颜色设置成半透明的黑色
	ctx.fillRect(0,0,width,height);//在下一个视图画出来时用来遮住之前的视图的。如果不这样做得的，你就会在屏幕上看到一条蛇的形状而不是小球的运动了
	//用来填充的颜色设置成半透明的，rgba(0,0,0,0.25)，也就是让之前的视图留下来一点点，从而你可以看到小球运动时的尾巴。如果你将 0.25 设置成 1 时，你就完全看不到了。试着改变其中的值查看造成的影响。

	//当且仅当小球数量小于 25 时，将 random( ) 函数产生的数字传入新的小球实例从而创建一个新的小球，并且加入到数组中。因此当屏幕上有 25 个小球时，不会再出现更多小球。你可以改变这个值，从而看到不同小球个数造成的影响。如果你的电脑或者浏览器性能不怎么样的话，几千个小球的速度就会明显慢下来。
	while(balls.length<25){
		var ball=new Ball(
			random(0,width),
			random(0,height),
			random(-7,7),
			random(-7,7),
			'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
			random(10,20)
		);
		balls.push(ball);
	}

	//遍历数组中的所有小球，并且让每个小球都调用 draw( ) 和 update( ) 函数来将自己画出来，并且再接下来的每一帧都按照其速度进行必要的跟新
	for(var i=0;i<balls.length;i++){
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	}
	//当一个函数正在运行时传递相同的函数名，从而每隔一小段时间都会运行一次这个函数，从而得到一个平滑的动画效果。这主要是通过递归完成的 — 也就是说函数每次运行的时候都会调用自己，从而可以一遍又一遍得运行
	requestAnimationFrame(loop);
}

loop();



