using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;
using System.Drawing;
using System.IO;
using System.Drawing.Imaging;

namespace Web.Mvc.Controllers.extend
{
    /// <summary>
    /// 验证码图片
    /// </summary>
    public class ValidateCode
    {

        int intLength = 4;               //长度
        string strIdentify = "checkcode"; //随机字串存储键值，存储到Session中

        /// <summary>
        /// 生成验证码，并存入session
        /// </summary>
        /// <returns></returns>
        public byte[] CreateValidateGraphic()
        {
            Bitmap b = new Bitmap(200, 60);
            Graphics g = Graphics.FromImage(b);
            try
            {

                g.FillRectangle(new SolidBrush(Color.YellowGreen), 0, 0, 200, 60);
                Font font = new Font(FontFamily.GenericSerif, 48, FontStyle.Bold, GraphicsUnit.Pixel);
                Random r = new Random();

                //合法随机显示字符列表
                string strLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
                StringBuilder s = new StringBuilder();

                //将随机生成的字符串绘制到图片上
                for (int i = 0; i < intLength; i++)
                {
                    s.Append(strLetters.Substring(r.Next(0, strLetters.Length - 1), 1));
                    g.DrawString(s[s.Length - 1].ToString(), font, new SolidBrush(Color.Blue), i * 38, r.Next(0, 15));
                }

                //生成干扰线条
                Pen pen = new Pen(new SolidBrush(Color.Blue), 2);
                for (int i = 0; i < 10; i++)
                {
                    g.DrawLine(pen, new Point(r.Next(0, 199), r.Next(0, 59)), new Point(r.Next(0, 199), r.Next(0, 59)));
                }

                HttpContext.Current.Session.Add(strIdentify, s.ToString());

                MemoryStream stream = new MemoryStream();
                b.Save(stream, ImageFormat.Jpeg);
                //输出图片流
                return stream.ToArray();
            }
            finally
            {
                g.Dispose();
                b.Dispose();
            }
        }

    }
}
