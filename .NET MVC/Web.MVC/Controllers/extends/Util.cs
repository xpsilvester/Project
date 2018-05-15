using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Mvc.Controllers.extends
{
    public class Util
    {
        /**
         * 计算日期差距
         * 参数：起始日期，结束日期，计算方式（1：年，2：月，3：日，4：时，5：分，6：秒）
         */
        public double DateDiff(DateTime startDate, DateTime endDate,int howtocompare = 3)
        {
            //调用
            //Util util = new Util();
            //DateTime end = DateTime.Now;
            //DateTime start = Convert.ToDateTime("2018-01-01 00:00");
            //double diff = util.DateDiff(start, end);
            //Response.Write(d.ToString("f0"));//四舍五入

            double diff = 0;
            TimeSpan TS = new TimeSpan(endDate.Ticks - startDate.Ticks);

            switch (howtocompare)
            {
                case 1:
                    diff = Convert.ToDouble(TS.TotalDays / 365);
                    break;
                case 2:
                    diff = Convert.ToDouble((TS.TotalDays / 365) * 12);
                    break;
                case 3:
                    diff = Convert.ToDouble(TS.TotalDays);
                    break;
                case 4:
                    diff = Convert.ToDouble(TS.TotalHours);
                    break;
                case 5:
                    diff = Convert.ToDouble(TS.TotalMinutes);
                    break;
                case 6:
                    diff = Convert.ToDouble(TS.TotalSeconds);
                    break;
                default:
                    diff = Convert.ToDouble(TS.TotalDays);
                    break;
            }

            return diff;
        }
    }
}