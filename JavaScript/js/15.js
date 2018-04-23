window.onload=function(){
	var drawing = document.getElementById("drawing");
	//确定浏览器支持<canvas>元素
	if(drawing.getContext){
		//取得图像的数据URI
		var imgURI=drawing.toDataURL("image/png");

		//显示图像
		var image=document.createElement("img");
		image.src=imgURI;
		document.body.appendChild(image);
	}

	if(drawing.getContext){
		var context=drawing.getContext("2d");

		//绘制红色矩形
		context.fillStyle="#ff0000";
		context.fillRect(10,10,50,50);
		// context.strokeStyle="#ff0000";
		// context.strokeRect(10,10,50,50);

		//绘制半透明的蓝色矩形
		context.fillStyle="rgba(0,0,255,0.5)";
		context.fillRect(30,30,100,100);
		// context.strokeStyle="rgba(0,0,255,0.5)";
		// context.strokeRect(30,30,100,100);

		//在两个矩形重叠的地方清除一个小矩形
		context.clearRect(40,40,10,10);
	}
	//时钟
	if(drawing.getContext){
		var context = drawing.getContext("2d");

		//开始路径
		context.beginPath();
		//绘制外圆
		context.arc(200,200,99,0,2*Math.PI,false);

		//绘制内圆
		context.moveTo(294,200);
		context.arc(200,200,94,0,2*Math.PI,false);

		//变换原点
		context.translate(200,200);

		//旋转表针
		//context.rotate(1);

		//绘制分针
		// context.moveTo(200,200);
		// context.lineTo(200,125);
		context.moveTo(0,0);
		context.lineTo(0,-75);

		//绘制时针
		// context.moveTo(200,200);
		// context.lineTo(140,200);
		context.moveTo(0,0);
		context.lineTo(-60,0);

		//绘制文本
		context.font="bold 14px Arial";
		context.textAlign="center";
		context.textBaseline="middle";
		context.fillText("12",0,-80);

		//字体控制
		var fontSize=100;
		context.font=fontSize+"px Arial";

		while(context.measureText("Hello World!").width > 140){
			fontSize--;
			context.font=fontSize+"px Arial";
		}

		context.fillText("Hello World!",100,100);
		context.fillText("Font size is "+fontSize+"px",110,150);

		//描边路径

		context.stroke();

		//设置阴影
		context.shadowOffsetX=5;
		context.shadowOffsetY=5;
		context.shadowBlur=4;
		context.shadowColor="rgba(0,0,0,0.5)";


		context.fillStyle="#ff0000";
		context.save();

		context.fillStyle="#00ff00";
		context.translate(200,200);
		context.save();

		//渐变
		var gradient=context.createLinearGradient(0,0,100,100);
		gradient.addColorStop(0,"white");
		gradient.addColorStop(1,"black");

		context.fillStyle=gradient;
		context.fillRect(0,0,100,200);//从点(500,500)开始绘制蓝色矩形

		context.restore();
		context.fillRect(10,10,100,200);//从点(510,510)开始绘制绿色矩形

		context.restore();
	}




}
