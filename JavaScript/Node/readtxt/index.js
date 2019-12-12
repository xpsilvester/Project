//读取日志文件txt,生成sql文件

const readline = require('readline');//Readline是Node.js里实现标准输入输出的封装好的模块，通过这个模块我们可以以逐行的方式读取数据流。使用require(“readline”)可以引用模块。
const fs = require('fs');

const r1 = readline.createInterface({
  input: fs.createReadStream("logbak.txt")
});

let i = 0 , j=0; //txt中的行数

let accountPattern = /(?<accountTime>\d+\/\d+\/\d+\s\d+:\d+:\d+)\s+微信\sPay:\saccountId=(?<accountId>\d+)\sdeviceId=(?<deviceId>\w+)\s.*/;
let orderPattern = /(?<createTime>\d+\/\d+\/\d+\s\d+:\d+:\d+).*?\<xml>\<trade_type>.*\<total_fee>\<!\[CDATA\[(?<totalFee>\d+)\]\]>\<\/total_fee>.*\<out_trade_no>\<!\[CDATA\[(?<osnNum>\d+)\]\]>\<\/out_trade_no>.*\<body>\<!\[CDATA\[(?<orderName>.*?)\]\]>\<\/body>.*?\<\/xml>/;
let notifyPattern = /(?<notifyTime>\d+\/\d+\/\d+\s\d+:\d+:\d+).*?\<xml>\<appid>.*\<out_trade_no>\<!\[CDATA\[(?<notifyOsn>\d+)\]\]>\<\/out_trade_no>.*\<transaction_id>\<!\[CDATA\[(?<transaction_id>\d+)\]\]>\<\/transaction_id>\<\/xml>/;

let accountData = {accountTime:'',accountId:'',deviceId:''};
let orderData = {createTime:'',totalFee:'',osnNum:'',orderName:''};
let notifyData = {notifyTime:'',notifyOsn:'',transaction_id:''};

let outputOrderSqlPath;
let outputUpdateOrderSqlPath;

r1.on('line', function(line){ //事件监听
    if(line.trim() != ''){
        //console.log('Line from file:' + i + ":" + line);
　　    
        if(accountPattern.test(line)){
            accountData = accountPattern.exec(line).groups;
            //console.log(accountData)
        }
        if(orderPattern.test(line)){
            orderData = orderPattern.exec(line).groups;
            //console.log(orderData)
            if(accountData.accountTime == orderData.createTime){
                orderData.totalFee = (orderData.totalFee/100).toFixed(2);
                console.log("accountTime:" + accountData.accountTime + ",accountId:" + accountData.accountId + ",deviceId:" + accountData.deviceId);
                console.log("createTime:" + orderData.createTime + ",osnNum:" + orderData.osnNum + ",orderName:" + orderData.orderName + ",totalFee:" + orderData.totalFee);
                
                let orderStringBuilder = `INSERT INTO orders(createTime, accountId, deviceId, osnNum, orderName, totalFee ,paysn, paytime) VALUES('${orderData.createTime}', '${accountData.accountId}', '${accountData.deviceId}', '${orderData.osnNum}','${orderData.orderName}','${orderData.totalFee}','','');\n`
                if(i%10000 === 0){
                    outputOrderSqlPath = fs.createWriteStream("order_"+ Math.floor(i/10000) +".sql");
                }
                outputOrderSqlPath.write(orderStringBuilder);
                i++;
            }
        }
        if(notifyPattern.test(line)){
            notifyData = notifyPattern.exec(line).groups;
            console.log("notifyTime:" + notifyData.notifyTime + ",notifyOsn:" + notifyData.notifyOsn + ",transaction_id:" + notifyData.transaction_id);
            let updateOrderStringBuilder = `UPDATE orders SET paysn = '${notifyData.transaction_id}',paytime = '${notifyData.notifyTime}' WHERE osnNum = '${notifyData.notifyOsn}'`;
            if(j%10000 === 0){
                outputUpdateOrderSqlPath = fs.createWriteStream("updateOrder_"+ Math.floor(i/10000) +".sql");
            }
            outputUpdateOrderSqlPath.write(updateOrderStringBuilder);
            j++;
        }
    }
})