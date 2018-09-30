window.onload = function(){
    var canvas = document.getElementById('tutorial');//第一个canvas
    var tangram = document.getElementById('tangram');//第二个canvas
    var chessboard = document.getElementById('chessboard');//第三个canvas
    var move = document.getElementById('move');//第四个canvas
    var spin = document.getElementById('spin');//第五个canvas
    var ellipse = document.getElementById('ellipse');//第六个canvas
    if(canvas.getContext){

        /**画板练习（1）begin**/
        var ctx = canvas.getContext('2d');
        //两个矩形
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(10,10,55,50);
        ctx.fillStyle = "rgba(0,0,200,0.5)";
        //ctx.fillRect(30,30,55,50);
        ctx.strokeRect(30,30,55,50);
        ctx.clearRect(15,15,20,25);

        //直线
        ctx.beginPath(); //新建一条path
        ctx.moveTo(100, 50); //把画笔移动到指定的坐标
        ctx.lineTo(200, 50);  //绘制一条从当前位置到指定坐标(200, 50)的直线.
        //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
        ctx.closePath();
        ctx.stroke(); //绘制路径。

        //三角形
        ctx.beginPath();
        ctx.moveTo(50, 100);
        ctx.lineTo(200, 100);
        ctx.lineTo(200, 300);
        ctx.fillStyle = "rgba(255,0,200,0.5)";//填充颜色
        ctx.fill(); //填充闭合区域。如果path没有闭合，则fill会自动闭合路径
        ctx.closePath(); //虽然我们只绘制了两条线段，但是closePath会closePath，仍然是一个3角形
        ctx.stroke(); //描边。stroke不会自动closePath()

        //圆
        ctx.beginPath();
        //arc(x, y, r, startAngle, endAngle, anticlockwise) 以(x, y)为圆心，以r为半径，
        //从 startAngle弧度开始到endAngle弧度结束。anticlosewise是布尔值，true表示逆时针，false表示顺时针。(默认是顺时针)
        ctx.arc(250, 50, 40, 0, Math.PI * 2, false); 
        var grd1=ctx.createRadialGradient(245,45,40,245,40,0);
        grd1.addColorStop(0,"red");
        grd1.addColorStop(1,"white");
        ctx.fillStyle = grd1;
        ctx.fill();
        ctx.closePath();//闭合路径
        ctx.stroke();

        /**画板练习（1）end**/


        /**七巧板（2）begin**/
        var qqb = tangram.getContext('2d');

        var tangramArray = [
            {   //绿色大三角
                start: [0,0], //起始点
                points: [[500,0],[250,250]], //途径的点
                color: '#cce894' //颜色
            },
            {   //蓝色大三角
                start: [0,0],
                points: [[250,250],[0,500]],
                color: '#6ac1d4'
            },
            {   //红色平行四边形
                start: [500,0],
                points: [[375,125],[375,375],[500,250]],
                color: '#f03e62'
            },
            {   //黄色小三角形
                start: [250,250],
                points: [[375,125],[375,375]],
                color: '#faf226'
            },
            {   //紫色正方形
                start: [250,250],
                points: [[125,375],[250,500],[375,375]],
                color: '#a796c2'
            },
            { //粉色小三角形
                start: [0,500],
                points: [[125,375],[250,500]],
                color: '#f394c9'
            },
            {   //橙色中三角形
                start: [250,500],
                points: [[500,250],[500,500]],
                color: '#facb2e'
            }
        ]
        for(var i=0;i<tangramArray.length;i++){
            qqb.beginPath(); //开始路径
            qqb.moveTo(tangramArray[i].start[0],tangramArray[i].start[1]); //起始点
            //绘制图形
            for(var k=0;k<tangramArray[i].points.length;k++){
                qqb.lineTo(tangramArray[i].points[k][0],tangramArray[i].points[k][1]);
            }
            qqb.lineTo(tangramArray[i].start[0],tangramArray[i].start[1]); //闭合图形
            qqb.fillStyle = tangramArray[i].color;//填充颜色
            qqb.fill(); //填充闭合区域。如果path没有闭合，则fill会自动闭合路径   
        }
        /**七巧板（2）end**/

        /**棋盘（3）begin**/
        var cb = chessboard.getContext('2d');
        var lineNum = 19, //棋盘线数
            lineLong = 25,//格子间距
            chessSize = parseInt(lineLong/2)-1,//棋子大小
            cbStart = (500 - (lineNum-1)*lineLong)/2; //棋盘起始线位置
        //棋盘绘制
        var chessboardDraw = function(){ 
            for(var j=0;j<lineNum;j++){
                //横线
                cb.moveTo(cbStart,cbStart+j*lineLong);
                cb.lineTo(cbStart+(lineNum-1)*lineLong,cbStart+j*lineLong);
                //竖线
                cb.moveTo(cbStart+j*lineLong,cbStart);
                cb.lineTo(cbStart+j*lineLong,cbStart+(lineNum-1)*lineLong);
            }
            cb.stroke();//描边
        }
        chessboardDraw();

        /**棋盘（3）end**/

        /**棋子（3）begin**/
        var chesses = function(x,y,color){//x:x坐标，y:y坐标，color:颜色
            cb.beginPath();
            //arc(x, y, r, startAngle, endAngle, anticlockwise) 以(x, y)为圆心，以r为半径，
            //从 startAngle弧度开始到endAngle弧度结束。anticlosewise是布尔值，true表示逆时针，false表示顺时针。(默认是顺时针)
            cb.arc(x, y, chessSize , 0, Math.PI * 2, false); 
            var grd=ctx.createRadialGradient(x,y,chessSize,x,y-2,0);
            if(color=='#fff'){
                grd.addColorStop(0,'#fff');
                grd.addColorStop(1,'#e6e6e6');
            }else{
                grd.addColorStop(0,color);
                grd.addColorStop(1,'#fff');
            }
            cb.fillStyle = grd;//填充颜色
            cb.fill();
            cb.closePath();//闭合路径
            cb.stroke();
        }
        chesses(200,50,'#000');
        chesses(225,50,'#fff');
        chesses(225,75,'#000');
        /**棋子（3）end**/

        /**点阵数字（3）begin**/
        //数字数组
        var numArr =[
            //0
            [
                [0,1,1,1,1,1,0],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [0,1,1,1,1,1,0]
            ],
            //1
            [
                [0,0,0,1,0,0,0],
                [0,0,1,1,0,0,0],
                [0,1,0,1,0,0,0],
                [0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0],
                [0,1,1,1,1,1,0]
            ],
            //2
            [
                [0,1,1,1,1,1,0],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [0,0,0,0,0,0,1],
                [0,0,0,0,0,1,0],
                [0,0,0,0,1,0,0],
                [0,0,0,1,0,0,0],
                [0,0,1,0,0,0,0],
                [0,1,0,0,0,0,0],
                [1,0,0,0,0,0,0],
                [1,1,1,1,1,1,1]
            ],
            //3
            [
                [0,1,1,1,1,1,0],
                [1,0,0,0,0,0,1],
                [0,0,0,0,0,0,1],
                [0,0,0,0,0,0,1],
                [0,0,0,0,0,0,1],
                [1,1,1,1,1,1,0],
                [0,0,0,0,0,0,1],
                [0,0,0,0,0,0,1],
                [0,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [0,1,1,1,1,1,0]
            ],
            //4
            [
                [0,0,0,0,0,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,1,0,1,0],
                [0,0,1,0,0,1,0],
                [0,1,0,0,0,1,0],
                [1,0,0,0,0,1,0],
                [1,1,1,1,1,1,1],
                [0,0,0,0,0,1,0],
                [0,0,0,0,0,1,0],
                [0,0,0,0,0,1,0],
                [0,0,0,0,0,1,0]
            ],
            //5
            [
                [1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0],
                [1,0,0,0,0,0,0],
                [1,0,0,0,0,0,0],
                [1,0,0,0,0,0,0],
                [1,1,1,1,1,1,0],
                [0,0,0,0,0,0,1],
                [0,0,0,0,0,0,1],
                [0,0,0,0,0,0,1],
                [0,0,0,0,0,0,1],
                [1,1,1,1,1,1,0]
            ],
            //6
            [
                [0,1,1,1,1,1,1],
                [1,0,0,0,0,0,0],
                [1,0,0,0,0,0,0],
                [1,0,0,0,0,0,0],
                [1,0,0,0,0,0,0],
                [1,1,1,1,1,1,0],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [0,1,1,1,1,1,0]
            ],
            //7
            [
                [1,1,1,1,1,1,1],
                [0,0,0,0,0,0,1],
                [0,0,0,0,0,0,1],
                [0,0,0,0,0,1,0],
                [0,0,0,0,1,0,0],
                [0,0,0,1,0,0,0],
                [0,0,1,0,0,0,0],
                [0,1,0,0,0,0,0],
                [1,0,0,0,0,0,0],
                [1,0,0,0,0,0,0],
                [1,0,0,0,0,0,0]
            ],
            //8
            [
                [0,1,1,1,1,1,0],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,1,1,1,1,1,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [0,1,1,1,1,1,0]
            ],
            //9
            [
                [0,1,1,1,1,1,0],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [0,1,1,1,1,1,1],
                [0,0,0,0,0,0,1],
                [0,0,0,0,0,0,1],
                [0,0,0,0,0,0,1],
                [1,0,0,0,0,0,1],
                [0,1,1,1,1,1,0]
            ]
        ]
        //绘制数字

        var numDraw = function(num){//num:要绘制的数字 0-9
            var leftMove = parseInt((lineNum - 7)/2),//左偏移量
                topMove = parseInt((lineNum-10)/2);//上偏移量
            if(num>9){
                return;
            }else{
                for(var q=0;q<numArr[num].length;q++){ //q:竖格,w:横个
                    for(var w=0;w<numArr[num][q].length;w++){
                        numArr[num][q][w] == 1 ? chesses(cbStart+(leftMove+w)*lineLong , cbStart+(q+topMove)*lineLong ,'#000'):'';
                    }
                }
            }
        }
        numDraw(9);
        
        /**点阵数字（3）end**/

        /**倒计时（3）begin**/
        var countDown = function(){
            var time = 10;
            setInterval(function(){
                time = time == 0 ? 9 : time-1;
                //cb.clearRect(0,0,500,500); //这种方法清除画布有bug，1，6，7白点待解决
                cb.fillStyle="#fff";
                cb.beginPath();
                cb.fillRect(0,0,500,500);
                cb.closePath();
                chessboardDraw(lineNum,lineLong);
                numDraw(time);
            },1000);
        }
        countDown();

        /**倒计时（3）end**/

        /**匀速直线来回运动（4）begin**/
        var mv = move.getContext('2d');
        var speedX = 5, //x轴速度
            speedY = 7, //y轴速度
            startPointX = 30, //x坐标
            startPointY = 30; //y坐标
        var run = function(runItem){
            runItem.clearRect(0,0,500,500);
            //判断是否碰壁
            if(startPointX > 470 || startPointX < 30 ){
                speedX = -speedX;
            }
            if(startPointY > 470 || startPointY < 30){
                speedY = -speedY;
            }
            startPointX+=speedX;
            startPointY+=speedY;
            runItem.beginPath();
            runItem.arc(startPointX,startPointY,30,0,2*Math.PI,true);
            mv.fillStyle='#d9d9d9';
            runItem.closePath();
            runItem.fill();
            requestAnimationFrame(function(){run(mv)});
        }
        run(mv);
        /**匀速直线来回运动（4）end**/

        /**匀速圆周运动（5）begin**/
        var sp = spin.getContext('2d');
        var spTime = 0; //定义运动的执行次数
        //旋转函数
        function spRun(){
            sp.clearRect(0,0,500,500);   
            drawNotChange();
            sp.save();//将当前以左上角坐标为(0,0)的上下文环境进行保存，这样是为了在接下来中要进行画布偏移后，可以进行还原当前的环境
            sp.translate(250,250);
            sp.rotate(spTime*8*Math.PI/180);//设定每次旋转的度数
            sp.fillStyle='blue';
            sp.beginPath();
            sp.arc(0,150,30,0,2*Math.PI,false);
            sp.closePath();
            sp.fill();
            sp.restore();//将当前为(500,400)的点还原为（0,0）,其实在save中就是将上下文环境保存到栈中，在restore下面对其进行还原
            spTime+=1;
            requestAnimationFrame(spRun);
        }
        function drawNotChange(){
            sp.fillStyle='red';
            sp.beginPath();
            sp.arc(250,250,30,0,2*Math.PI,true);
            sp.closePath();
            sp.fill();
            sp.beginPath();
            sp.arc(250,250,150,0,2*Math.PI,true);
            sp.closePath();
            sp.stroke();
        }
        spRun();
        /**匀速圆周运动（5）end**/

        /**椭圆运动（6）begin**/

        //假设原点O(250，250)，绕椭圆运动的物体为圆形半径为30，
        //其中长半轴长a=200,短半轴长为b=100，每次重新获取物体的运动后的移动位置的时候，
        //x都会变化一个单位，旋转为顺时针旋转，开始位置为原点的正左边的端点，
        //最后原点我们以一个黑色且半径为10的小球表示。
        //注意：上述的数据可以自行定义，但是要注意这个前提是必须保证a>b,如果a<b那么就不是这个公式了
        var ec = ellipse.getContext('2d');
        var ecA = 200,
            ecB = 100,
            radius = 30,
            ecTime = 0;
        centerPoint();
        arcRoute(250,250,ecA,ecB,radius);
        setInterval(function(){
            arcRoute(250,250,ecA,ecB,radius);
        }, 70);
        //绘制原点
        function centerPoint(){
            ec.fillStyle="black";
            ec.beginPath();
            ec.arc(250,250,10,0,2*Math.PI,true)
            ec.closePath();
            ec.fill();
        }
        //椭圆路线绘制
        function route(x,y,a,b){
            var step = (a > b) ? 1 / a : 1 / b;
            ec.beginPath();
            ec.moveTo(x + a, y); //从椭圆的左端点开始绘制
            for (var i = 0; i < 2 * Math.PI; i += step)
            {
                ec.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
            }
            ec.closePath();
            ec.stroke();
        }

        //椭圆上小球运动的实现
        function arcRoute(x,y,a,b,r){
            ec.clearRect(0,0,500,500);
            route(x,x,a,b);
            centerPoint(ec);
            ec.fillStyle="red";
            if(ecTime==0){
                ec.beginPath();
                ec.arc(x,y,r,0,2*Math.PI,true);
                ec.closePath();
                ec.fill();
            }else{
                ec.beginPath();
                ec.arc(x+a*Math.cos(ecTime),y+b*Math.sin(ecTime),r,0,2*Math.PI,true);
                ec.closePath();
                ec.fill();
            }
            ecTime+=1;
        }

        /**椭圆运动（6）end**/


    }else{
        console.log('不支持Canvas');
    }
}
