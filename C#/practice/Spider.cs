using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace practice
{
    class Spider
    {
       public void autoExcute(string filePath)
       {
           var file = filePath.Replace("index.html", "").Replace(@"\",@"/");
           //string path = "D:/Documents and Settings/Desktop/SourceHanSansCN/index.html";
           string path = file + "index.html";
           //string path1 = "D:/Documents and Settings/Desktop/SourceHanSansCN/SourceHanSansCN-Medium.ttf";
           string path1 = file + "SourceHanSansCN-Medium.ttf";
           //string strInput = "font-spider "+"\""+"D:\\Documents and Settings\\Desktop\\SourceHanSansCN\\index.html"+"\"";
           string strInput = "font-spider " + "\"" + filePath + "\"";
           //string spider = "D:/Documents and Settings/Desktop/SourceHanSansCN/.font-spider";
           string spider = file + ".font-spider";
           string source = @"D:/Documents and Settings/Desktop/SourceHanSansCN/source/SourceHanSansCN-Medium.ttf";
           //string finalRoute = @"D:/Documents and Settings/Desktop/SourceHanSansCN/SourceHanSansCN-Medium.ttf";
           string finalRoute = file + "SourceHanSansCN-Medium.ttf";

           if (System.IO.File.Exists(path))
           {
               Console.WriteLine("本地文件确实存在！");
               try
               {
                   FileInfo info = new FileInfo(source);
                   info.CopyTo(finalRoute, true);
                   Console.WriteLine("{0} copied to {1}", source, finalRoute);
                   Console.WriteLine("The second Copy operation succeeded, which was expected.");
               }

               catch
               {
                   Console.WriteLine("Double copy is not allowed, which was not expected.");
               }
               if (System.IO.File.Exists(path1))
               {
                   Process pk = new Process();
                   //设置要启动的应用程序
                   pk.StartInfo.FileName = "cmd.exe";
                   //是否使用操作系统shell启动
                   pk.StartInfo.UseShellExecute = false;
                   // 接受来自调用程序的输入信息
                   pk.StartInfo.RedirectStandardInput = true;
                   //输出信息
                   pk.StartInfo.RedirectStandardOutput = true;
                   // 输出错误
                   pk.StartInfo.RedirectStandardError = true;
                   //不显示程序窗口
                   pk.StartInfo.CreateNoWindow = false;
                   //启动程序
                   pk.Start();

                   //向cmd窗口发送输入信息
                   pk.StandardInput.WriteLine(strInput + "&exit");

                   pk.StandardInput.AutoFlush = true;

                   //获取输出信息
                   string strOuput = pk.StandardOutput.ReadToEnd();
                   //等待程序执行完退出进程
                   pk.WaitForExit();
                   pk.Close();
                   Console.WriteLine(strOuput);
                   /// <summary>
                   /// 根据路径删除文件
                   /// </summary>
                   /// <param name="path"></param>
                   //删除文件夹
                   FileAttributes attr = File.GetAttributes(spider);
                   if (attr == FileAttributes.Directory)
                   {
                       Directory.Delete(spider, true);
                   }
                   else
                   {
                       File.Delete(spider);
                   }

               }
               else
               {
                   Console.WriteLine("字体文件不存在无法格式化");
               }
           }
           else
           {
               Console.WriteLine("本地文件不存在！");
           }
       }

       public void WatcherStrat(string path, string filter)
       {

           FileSystemWatcher watcher = new FileSystemWatcher();
           watcher.Path = path;
           watcher.Filter = filter;
           watcher.Changed += new FileSystemEventHandler(OnProcess);
           watcher.Created += new FileSystemEventHandler(OnProcess);
           watcher.Deleted += new FileSystemEventHandler(OnProcess);
           watcher.Renamed += new RenamedEventHandler(OnRenamed);
           watcher.EnableRaisingEvents = true;
           watcher.NotifyFilter = NotifyFilters.Attributes | NotifyFilters.CreationTime | NotifyFilters.DirectoryName | NotifyFilters.FileName | NotifyFilters.LastAccess
                                  | NotifyFilters.LastWrite | NotifyFilters.Security | NotifyFilters.Size;
           watcher.IncludeSubdirectories = true;
       }

       private static void OnProcess(object source, FileSystemEventArgs e)
       {
           if (e.ChangeType == WatcherChangeTypes.Created)
           {
               OnCreated(source, e);
           }
           else if (e.ChangeType == WatcherChangeTypes.Changed)
           {
               OnChanged(source, e);
           }
           else if (e.ChangeType == WatcherChangeTypes.Deleted)
           {
               OnDeleted(source, e);
           }

       }
       private static void OnCreated(object source, FileSystemEventArgs e)
       {
           Console.WriteLine("文件新建事件处理类型：{0}，路径：{1}，文件或文件夹名称：{2}", e.ChangeType, e.FullPath, e.Name);
           Spider spider = new Spider();
           spider.autoExcute(e.FullPath);
       }
       private static void OnChanged(object source, FileSystemEventArgs e)
       {
           Console.WriteLine("文件改变事件处理类型：{0}，路径：{1}，文件或文件夹名称：{2}", e.ChangeType, e.FullPath, e.Name);
           Spider spider = new Spider();
           spider.autoExcute(e.FullPath);
       }

       private static void OnDeleted(object source, FileSystemEventArgs e)
       {
           Console.WriteLine("文件删除事件处理类型：{0}，路径：{1}，文件或文件夹名称：{2}", e.ChangeType, e.FullPath, e.Name);
       }

       private static void OnRenamed(object source, RenamedEventArgs e)
       {
           Console.WriteLine("文件重命名事件处理类型：{0}，路径：{1}，文件或文件夹名称：{2}", e.ChangeType, e.FullPath, e.Name);
           Spider spider = new Spider();
           spider.autoExcute(e.FullPath);
       }
       

    }
}
