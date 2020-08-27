using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Linq;

namespace ProductImgRenameTool
{
    public class Program
    {
        static void Main(string[] args)
        {
            ToolConfig config = new ToolConfig();
            Console.WriteLine("||-------------------------------------||");
            Console.WriteLine("||-------------------------------------||");
            Console.WriteLine("||图片无损压缩——C#版||");
            Console.WriteLine("||-------");
            Console.WriteLine("||-------------------------------------||");
            Console.WriteLine("||-------------------------------------||");

            byte[] byData = GetPictureData(@"D:\Desktop\产品图\new3-2v2.jpg");

            byte[] outputData = ConvertToThumbnail(byData);

            System.IO.File.WriteAllBytes(@"D:\Desktop\产品图\output\ouput.jpg", outputData);

            Console.WriteLine("操作完成！\r\n");
            Console.ReadKey();
        }

        public static byte[] GetPictureData(string imagepath)
        {
            /**/////根据图片文件的路径使用文件流打开，并保存为byte[]
            FileStream fs = new FileStream(imagepath, FileMode.Open);//可以是其他重载方法
            byte[] byData = new byte[fs.Length];
            fs.Read(byData, 0, byData.Length);
            fs.Close();
            return byData;
        }

        /// <summary>

        /// 图像缩略图处理

        /// </summary>

        /// <param name="bytes">图像源数据</param>

        /// <param name="compression">压缩质量 1-100</param>

        /// <param name="thumbWidth">缩略图的宽</param>

        /// <param name="thumbHeight">缩略图的高</param>

        /// <returns></returns>

        public static byte[] ConvertToThumbnail(byte[] bytes, int compression = 100, int thumbWidth = 0, int thumbHeight = 0)

        {

            byte[] bs = null;

            try
            {
                if (bytes != null)
                {

                    using (MemoryStream ms = new MemoryStream(bytes))

                    {

                        using (Bitmap srcimg = new Bitmap(ms))

                        {

                            if (thumbWidth == 0 && thumbHeight == 0)

                            {

                                thumbWidth = srcimg.Width;

                                thumbHeight = srcimg.Height;

                            }

                            using (Bitmap dstimg = new Bitmap(thumbWidth, thumbHeight))//图片压缩质量

                            {

                                //从Bitmap创建一个System.Drawing.Graphics对象，用来绘制高质量的缩小图。

                                using (Graphics gr = Graphics.FromImage(dstimg))

                                {

                                    //把原始图像绘制成上面所设置宽高的缩小图

                                    Rectangle rectDestination = new Rectangle(0, 0, thumbWidth, thumbHeight);

                                    gr.Clear(Color.WhiteSmoke);

                                    gr.CompositingQuality = CompositingQuality.HighQuality;

                                    gr.SmoothingMode = SmoothingMode.HighQuality;

                                    gr.InterpolationMode = InterpolationMode.HighQualityBicubic;

                                    gr.DrawImage(srcimg, rectDestination, 0, 0, srcimg.Width, srcimg.Height, GraphicsUnit.Pixel);



                                    EncoderParameters ep = new EncoderParameters(1);

                                    ep.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, compression);//设置压缩的比例1-100

                                    ImageCodecInfo[] arrayICI = ImageCodecInfo.GetImageEncoders();

                                    ImageCodecInfo jpegICIinfo = arrayICI.FirstOrDefault(t => t.FormatID == System.Drawing.Imaging.ImageFormat.Jpeg.Guid);

                                    using (MemoryStream dstms = new MemoryStream())

                                    {

                                        if (jpegICIinfo != null)

                                        {

                                            dstimg.Save(dstms, jpegICIinfo, ep);

                                        }

                                        else

                                        {

                                            dstimg.Save(dstms, System.Drawing.Imaging.ImageFormat.Png);//保存到内存里

                                        }

                                        bs = new Byte[dstms.Length];

                                        dstms.Position = 0;

                                        dstms.Read(bs, 0, bs.Length);

                                    }

                                }

                            }

                        }

                    }

                }

            }

            catch (Exception ex)

            {
                Console.WriteLine(string.Concat("ConvertToThumbnail error.", thumbWidth, " ", thumbHeight, ex.ToString()));

            }

            return bs;

        }

        /// <summary>
        /// 改变图片尺寸
        /// </summary>
        /// <param name="img800File">源图片（800X800）对象</param>
        /// <param name="width">改变后的宽度</param>
        /// <param name="height">改变后的高度</param>
        /// <param name="quality">图片质量（1~100）</param>
        /// <param name="imgResizePath">改变后存放的目录及命名</param>
        private static void resizeFile(FileInfo img800File, int width, int height, int quality, string imgResizePath)
        {
            //存放尺寸改变后的图片的流
            FileStream streamForNew = new FileStream(Path.GetFullPath(imgResizePath), FileMode.OpenOrCreate);

            //源图对象
            Image origImage = Image.FromStream(img800File.OpenRead());

            Bitmap tempBitmap = new Bitmap(width, height);

            //创建一个包含质量等参数的新图片对象
            Graphics newImage = Graphics.FromImage(tempBitmap);
            newImage.CompositingQuality = CompositingQuality.HighQuality;
            newImage.SmoothingMode = SmoothingMode.HighQuality;
            newImage.InterpolationMode = InterpolationMode.HighQualityBicubic;
            //创建一个矩形并构图
            Rectangle imageRectangle = new Rectangle(0, 0, width, height);
            newImage.DrawImage(origImage, imageRectangle);
            //保存图片
            EncoderParameter eParam = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, new long[] { quality });
            EncoderParameters ep = new EncoderParameters();
            ep.Param[0]=eParam;
            ImageCodecInfo[] arrayICI = ImageCodecInfo.GetImageEncoders(); 
            ImageCodecInfo jpegICIinfo = null; 
            for (int x = 0; x < arrayICI.Length; x++) 
            { 
                if (arrayICI[x].FormatDescription.Equals("JPEG")) 
                { 
                    jpegICIinfo = arrayICI[x]; 
                    break; 
                } 
            }
            tempBitmap.Save(streamForNew, jpegICIinfo, ep);

            //释放资源
            newImage.Dispose();
            tempBitmap.Dispose();
            origImage.Dispose();
            streamForNew.Close();
            streamForNew.Dispose();
        }

        /// <summary>
        /// 重载1：改变图片尺寸
        /// </summary>
        /// <param name="img800File">源图片（800X800）路径</param>
        /// <param name="width">改变后的宽度</param>
        /// <param name="height">改变后的高度</param>
        /// <param name="imgResizePath">改变后存放的目录及命名</param>
        private static void resizeFile(string img800FilePath, int width, int height, string imgResizePath)
        {
            FileInfo fi = new FileInfo(Path.GetFullPath(img800FilePath));
            resizeFile(fi, width, height, 100, imgResizePath);
        }
    }
}
