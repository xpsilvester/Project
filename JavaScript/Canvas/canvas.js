window.onload = function(){
    var canvas = document.getElementById('tutorial');//第一个canvas
    var tangram = document.getElementById('tangram');//第二个canvas
    var chessboard = document.getElementById('chessboard');//第三个canvas
    var move = document.getElementById('move');//第四个canvas
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

        /**运动（4）begin**/
        var mv = move.getContext('2d');
        mv.fillStyle='#d9d9d9';
        mv.beginPath();
        mv.arc(30,30,30,0,2*Math.PI,true);
        mv.closePath();
        mv.fill();
        var speed = 7,
            startPoint = 30;
        var run = function(runItem){
            runItem.clearRect(0,0,500,500);
            if(startPoint > 470 || startPoint < 30){
                speed = -speed;
            }
            startPoint+=speed;
            runItem.beginPath();
            runItem.arc(startPoint,30,30,0,2*Math.PI,true);
            runItem.closePath();
            runItem.fill();
            requestAnimationFrame(function(){run(mv)});
        }
        run(mv);
        /**运动（4）end**/


    }else{
        console.log('不支持Canvas');
    }
}
