using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace ConsoleApp
{
    class Program
    {

        public static string outputOrderSqlPath = "D:\\Documents and Settings\\Desktop\\mergeLog\\order_";
        public static string outputUpdateOrderSqlPath = "D:\\Documents and Settings\\Desktop\\mergeLog\\updateorder_";
        public static Dictionary<string, List<string>> products;
        public static List<string> spideredUsers;

        public static string accountPattern = @"(\d+/\d+/\d+\s\d+:\d+:\d+)\s+微信\sPay:\saccountId=(\d+)\sdeviceId=(\w+)\s.*";
        public static string orderPattern = @"(\d+/\d+/\d+\s\d+:\d+:\d+).*?<xml><trade_type>.*<total_fee><!\[CDATA\[(\d+)\]\]></total_fee>.*<out_trade_no><!\[CDATA\[(\d+)\]\]></out_trade_no>.*<body><!\[CDATA\[(.*?)\]\]></body>.*?</xml>";
        public static string notfyPattern = @"(\d+/\d+/\d+\s\d+:\d+:\d+).*?<xml><appid>.*<out_trade_no><!\[CDATA\[(\d+)\]\]></out_trade_no>.*<transaction_id><!\[CDATA\[(\d+)\]\]></transaction_id></xml>";

        public static Regex rAccount = new Regex(accountPattern);
        public static Regex rOrder = new Regex(orderPattern);
        public static Regex rNotify = new Regex(notfyPattern);

        static void Main(string[] args)
        {
            Console.WriteLine("开始读取txt文件...");
            StreamReader sr = new StreamReader("D:\\Documents and Settings\\Desktop\\mergeLog\\logbak.txt", Encoding.GetEncoding("utf-8"));
            spideredUsers = new List<string>(10000);
            String line;
            int num = 0;
            string accountId = "";
            string deviceId = "";
            string accountTime = "";
            string createTime = "";
            string osnNum = "";
            string totalFee = "";
            string orderName = "";
            string notifyTime = "";
            string notifyOsn = "";
            string transaction_id = "";
            string pid = "";
            string psn = "";
            string cateid = "";
            string brandid = "";

            products = new Dictionary<string, List<string>>()
            {
                {"套餐1",new List<string>(){"sn00000000001", "45", "1", "0.01","0.01","0.01"}},
                {"套餐2",new List<string>(){"sn00000000002","57","11","70","130","0"}},
                {"套餐3",new List<string>(){ "sn00000000003", "58","11","40","160","0"}},
                {"套餐4",new List<string>(){ "sn00000000004", "59","11","8","13","0"}},
                {"套餐5",new List<string>(){ "sn00000000005", "60","11","140","420","0"}},
                {"套餐6",new List<string>(){ "sn00000000006", "61","11","240","260","0"}},
                {"套餐7",new List<string>(){ "sn00000000007", "62","11","244","20","0"}},
                {"套餐8",new List<string>(){ "sn00000000008", "63","13","903","190","0.01"}},
                {"套餐9",new List<string>(){ "sn00000000009", "64","13","280","280","0.02"}},
                {"套餐10",new List<string>(){ "sn00000000010", "65","13","260","460","0.04"}},
                {"套餐11",new List<string>(){ "sn00000000011", "66","13","440","640","0.06"}},
                {"套餐12",new List<string>(){ "sn00000000012", "67","13","620","820","0.08"}},
                {"套餐13",new List<string>(){ "sn00000000013", "68","13","800","1000","0.1"}},
                {"套餐14",new List<string>(){ "sn00000000014", "69","11","630","630","0.1"}},
                {"套餐15",new List<string>(){ "sn00000000015", "70","11","390","590","0.01"}},
                {"套餐16",new List<string>(){ "sn00000000016", "71","11","760","860","0.01"}},
                {"套餐17",new List<string>(){ "sn00000000017", "72","11","570","670","0.01"}},
                {"套餐18",new List<string>(){ "sn00000000018", "73","11","600","1600","0.01"}},
                {"套餐19",new List<string>(){ "sn00000000019", "74","11","1860","1860","0.01"}},
                {"套餐20",new List<string>(){ "sn00000000020", "75","21","0","0","0"}},
                {"套餐21",new List<string>(){ "sn00000000021", "76","21","0","0","0"}},
                {"套餐22",new List<string>(){ "sn00000000022", "77","21","0","0","0"}},
                {"套餐23",new List<string>(){ "sn00000000023", "78","21","0","0","0"}},
                {"套餐24",new List<string>(){ "sn00000000024", "79","11","250","340","0"}},
                {"套餐25",new List<string>(){ "sn00000000025", "80","11","460","640","0"}}
            };

            StringBuilder orderSqlBuilder = new StringBuilder();
            StringBuilder updateOrderSqlBuilder = new StringBuilder();

            int lineIndex = 0;
            int lineUpdateIndex = 0;
            while ((line = sr.ReadLine()) != null)
            {
                if (!string.IsNullOrEmpty((line = line.Trim())))
                {
                    //Console.WriteLine(line);
                    if (rAccount.IsMatch(line))
                    {
                        Match accounts = rAccount.Match(line);
                        accountTime = accounts.Groups[1].Value;
                        accountId = accounts.Groups[2].Value;
                        deviceId = accounts.Groups[3].Value;
                    }

                    if(rOrder.IsMatch(line))
                    {
                        Match orders = rOrder.Match(line);
                        createTime = orders.Groups[1].Value;
                        if(createTime == accountTime)
                        {
                            lineIndex++;
                            totalFee = (Convert.ToDecimal(orders.Groups[2].Value) / 100m).ToString("0.00");
                            osnNum = orders.Groups[3].Value;
                            orderName = orders.Groups[4].Value;
                            Console.WriteLine("accountTime:" + accountTime + ",accountId:" + accountId + ",deviceId:" + deviceId);
                            Console.WriteLine("createTime:" + createTime + ",osnNum:" + osnNum + ",orderName:" + orderName + ",totalFee:" + totalFee);

                            // p { 0: psn, 1: pid, 2: cateid, 3:shopprice, 4:marketprice, 5:costprice } 
                            if (!products.ContainsKey(orderName))
                            {
                                continue;
                            }
                            List<string> p = products[orderName];

                            //插入订单
                            orderSqlBuilder.Append("INSERT INTO [orders] ")
                                .Append("([rosn],[userId],[orderstate],[productamount],[orderamount],[surplusmoney],[isreview],[addtime],[shipsn],[shipsystemname],[shipfriendname],[shiptime],[paymode],[sn],[paysystemname],[payfriendname],[paytime],[regionid],[consignee],[mobile],[phone],[email],[zipcode],[address],[besttime],[shipfee],[fullcut],[discount],[paycreditcount],[paycreditmoney],[couponmoney],[weight],[buyerremark],[ip]) ")
                                .Append("VALUES ")
                                .Append("('")
                                .Append(osnNum)
                                .Append("','")
                                .Append(accountId)
                                .Append("','")
                                .Append(1)
                                .Append("','")
                                .Append(totalFee)
                                .Append("','")
                                .Append(totalFee)
                                .Append("','")
                                .Append(totalFee)
                                .Append("','0','")
                                .Append(createTime)
                                .Append("','','sto','顺丰快递','1900-01-01 00:00:00.000','10','")
                                .Append("")
                                .Append("','wechatpay','微信支付','")
                                .Append("")
                                .Append("','0','")
                                .Append(accountId)
                                .Append("','','','','000000','','")
                                .Append(createTime)
                                .Append("','0.00','0','0.00','0','0.00','0','0','{\"deviceId\":\"")
                                .Append(deviceId)
                                .Append("\",\"deviceName\":\"\",\"channelId\":\"0\",\"cloudUserName\":\"\"}','172.29.172.148')")
                                .Append("\r\n");
                            // 2. 插入订单商品
                            orderSqlBuilder.Append("INSERT INTO [orderproducts] ")
                                .Append("([oid],[userId],[sid],[pid],[psn],[cateid],[brandid],[name],[showimg],[discountprice],[shopprice],[costprice],[marketprice],[weight],[isreview],[realcount],[buycount],[sendcount],[type],[paycredits],[coupontypeid],[extcode1],[extcode2],[extcode3],[extcode4],[extcode5],[addtime]) ")
                                .Append("VALUES(")
                                .Append("SCOPE_IDENTITY(), '12', '', '")
                                .Append(p[1])
                                .Append("', '")
                                .Append(p[0])
                                .Append("', '")
                                .Append(p[2])
                                .Append("', '26', '")
                                .Append(orderName)
                                .Append("', '', '")
                                .Append(p[4])
                                .Append("', '")
                                .Append(p[3])
                                .Append("', '")
                                .Append(p[5])
                                .Append("', '")
                                .Append(p[4])
                                .Append("', 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, '")
                                .Append(createTime)
                                .Append("')")
                                .Append("\r\n");

                            //3. 更新users
                            orderSqlBuilder.Append("if (select COUNT([userId]) from users where username = '")
                                .Append(accountId)
                                .Append("') > 0\r\n")
                                .Append("begin\r\n")
                                .Append("update orders set[userId] = (select top 1 [userId] from users where username = '")
                                .Append(accountId)
                                .Append("') where rosn = '")
                                .Append(osnNum)
                                .Append("';\r\n")
                                .Append("update orderproducts set [userId] = (select top 1 [userId] from orders where rosn = '")
                                .Append(osnNum)
                                .Append("') where oid = (select top 1 oid from orders where rosn = '")
                                .Append(osnNum)
                                .Append("');\r\n")
                                .Append("end\r\n")
                                .Append("else\r\n")
                                .Append("begin\r\n")
                                // insert user
                                .Append("INSERT INTO [users]")
                                .Append(" ([username],[email],[mobile],[password],[userrid],[admingid],[nickname],[avatar],[paycredits],[rankcredits],[verifyemail],[verifymobile],[liftbantime],[salt])")
                                .Append(" VALUES")
                                .Append(" ('")
                                .Append(accountId)
                                .Append("', '', '', '', 7, 1, '','' ,2, 2, 0,0, '1900-01-01 00:00:00.000', '123456')")
                                .Append("\r\n")
                                // upodate orders orderproducts
                                .Append("update orders set [userId] = SCOPE_IDENTITY() where rosn = '")
                                .Append(osnNum)
                                .Append("';\r\n")
                                .Append("update orderproducts set [userId] = SCOPE_IDENTITY() where oid = (select top 1 oid from orders where rosn = '")
                                .Append(osnNum)
                                .Append("');\r\n")
                                .Append("end\r\n")
                                .Append("\r\n");

                            int fileIndex = lineIndex / 3000;
                            WriteFile(outputOrderSqlPath + fileIndex + ".sql", orderSqlBuilder.ToString());
                            orderSqlBuilder.Clear();

                        }
                    }
                    
                    if(rNotify.IsMatch(line))
                    {
                        lineUpdateIndex++;
                        Match notify = rNotify.Match(line);
                        notifyTime = notify.Groups[1].Value;
                        notifyOsn = notify.Groups[2].Value;
                        transaction_id = notify.Groups[3].Value;
                        Console.WriteLine("notifyTime:" + notifyTime + ",notifyOsn:" + notifyOsn + ",transaction_id:" + transaction_id);

                        updateOrderSqlBuilder.Append("UPDATE orders ")
                                           .Append("SET sn = '")
                                           .Append(transaction_id)
                                           .Append("',paytime = '")
                                           .Append(notifyTime)
                                           .Append("',orderstate='2' WHERE rosn = '")
                                           .Append(notifyOsn)
                                           .Append("'");

                        int fileIndex = lineUpdateIndex / 10000;
                        WriteFile(outputUpdateOrderSqlPath + fileIndex + ".sql", updateOrderSqlBuilder.ToString());
                        updateOrderSqlBuilder.Clear();
                    }
                }
                num++;
            }

        }

        static void WriteFile(string path, string content)
        {
            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(content);
            }
        }
    }
}
