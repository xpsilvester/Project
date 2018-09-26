window.onload = function(){
    var canvas = document.getElementById('tutorial');//第一个canvas
    var tangram = document.getElementById('tangram');//第二个canvas
    var chessboard = document.getElementById('chessboard');//第三个canvas
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
        ctx.arc(250, 50, 40, 0, Math.PI / 2, false); 
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
            qqb.stroke(); //描边。stroke不会自动closePath()
        }
        
        /**七巧板（2）end**/

        /**棋盘（3）begin**/
        var chessboardDraw = function(line,long){//line:棋盘线数,long:格子间距
            var cb = chessboard.getContext('2d');
            var cbStart = (500 - (line-1)*long)/2; //起始线位置
            for(var j=0;j<line;j++){
                //横线
                cb.moveTo(cbStart,cbStart+j*long);
                cb.lineTo(cbStart+(line-1)*long,cbStart+j*long);
                //竖线
                cb.moveTo(cbStart+j*long,cbStart);
                cb.lineTo(cbStart+j*long,cbStart+(line-1)*long);
                cb.stroke();//描边
            }
            cb.stroke();//描边
        }
        chessboardDraw(19,25);
        

    }else{
        console.log('不支持Canvas');
    }
}
