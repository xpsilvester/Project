using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Web.Mvc.Controllers.extend;
using Web.Mvc.DAL;
using Web.Mvc.Model;
using Web.MVC.Controllers;

namespace Web.Mvc.Controllers
{
    public class CmsController : BaseController
    {
        public CmsController()
            : base()
        {
            this.Module = MODULE_DOWNLOAD; //模块值
        }

        #region
        //显示ppt列表 ok
        [ActionName("List")]
        //[PPTAuthrize(permission = (int)p.Search)]
        public ActionResult PPTList()
        {
            List<PPTItem> pptList = new List<PPTItem>();
            int pageIndex = null == Request.QueryString["p"] ? 1 : Convert.ToInt32(Request.QueryString["p"]);
            string keyword = "";
            if (null != Request.QueryString["kw"])
            {
                keyword = Request.QueryString["kw"].FilterHttpGet() == null ? "" : Request.QueryString["kw"].ToString().FilterHttpGet();
            }
            int recordCount = this.WebUnity.PPTItemRepository.Get(filter: t => keyword.Length > 0 ? t.title.IndexOf(keyword) > -1 : true).Count();

            pptList = this.WebUnity.PPTItemRepository
                    .Get(pageIndex, 15, orderBy: q => q.OrderByDescending(t => t.updateDate), filter: t => keyword.Length > 0 ? t.title.IndexOf(keyword) > -1 : true)
                    .ToList<PPTItem>();
            int pageCount = recordCount % 15 == 0 ? recordCount / 15 : recordCount / 15 + 1;


            ViewData["label"] = "service";
            ViewData["state"] = "list";
            //ViewData["PPTItem"] = null;
            ViewData["PPTItemList"] = pptList;
            //ViewData["productClassList"] = null;
            //ViewData["PPTItemClassList"] = null;
            ViewData["pageCount"] = pageCount;
            ViewData["pageIndex"] = pageIndex;
            ViewData["kw"] = keyword;
            return View("~/views/cms/PPTManager.cshtml");
        }

        //进入ppt新建页
        [ActionName("create")]
        //[PPTAuthrize(permission = (int)p.Add)]
        public ActionResult CreatePPTItem()
        {
            PPTItem PPTItem = new PPTItem();
            List<PPTItem> PPTItemList = new List<PPTItem>();
            List<PPTClass> PPTClassList = new List<PPTClass>();
            //List<ProductClass> productClassList = new List<ProductClass>();
            PPTItem.updateDate = DateTime.Now;
            PPTClassList = this.WebUnity.PPTClassRepository.Get()
                    .ToList<PPTClass>();
            //productClassList = this.WebUnity.ProductClassRepository
            //        .Get(filter: t => t.classLevel == 1, orderBy: q => q.OrderBy(t => t.displayOrder))
            //        .ToList<ProductClass>();

            //List<ProductCmsClass> productCmsClassList = this.WebUnity.ProductCmsClassRepository
            //        .Get(orderBy: q => q.OrderBy(t => t.displayOrder))
            //        .ToList<ProductCmsClass>();

            //ViewData["productCmsClassList"] = productCmsClassList;

            ViewData["label"] = "service";
            ViewData["state"] = "create";
            ViewData["PPTItem"] = PPTItem;
            ViewData["PPTItemList"] = PPTItemList;
            ViewData["PPTClassList"] = PPTClassList;
            //ViewData["productClassList"] = productClassList;
            ViewData["pageCount"] = 0;
            ViewData["pageIndex"] = 0;
            ViewData["kw"] = "";
            return View("~/views/cms/PPTManager.cshtml");
        }

        //编辑ppt内容
        [ActionName("edit")]
        //[PPTAuthrize(permission = (int)p.Modify)]
        public ActionResult PPTItemEdit()
        {
            PPTItem PPTItem = new PPTItem();
            List<PPTItem> PPTItemList = new List<PPTItem>();
            List<PPTClass> PPTClassList = new List<PPTClass>();
            //List<ProductClass> productClassList = new List<ProductClass>();
            PPTItem = this.WebUnity.PPTItemRepository.GetById(Convert.ToInt32(Request.QueryString["id"]));
            PPTClassList = this.WebUnity.PPTClassRepository.Get(/*orderBy: q => q.OrderBy(t => t.displayOrder)*/)
                    .ToList<PPTClass>();
            //productClassList = this.WebUnity.ProductClassRepository
            //        .Get(filter: t => t.classLevel == 1, orderBy: q => q.OrderBy(t => t.displayOrder))
            //        .ToList<ProductClass>();

            //List<ProductCmsClass> productCmsClassList = this.WebUnity.ProductCmsClassRepository
            //        .Get(orderBy: q => q.OrderBy(t => t.displayOrder))
            //        .ToList<ProductCmsClass>();

            //ViewData["productCmsClassList"] = productCmsClassList;

            ViewData["label"] = "service";
            ViewData["state"] = "edit";
            ViewData["PPTItem"] = PPTItem;
            ViewData["PPTItemList"] = PPTItemList;
            ViewData["PPTClassList"] = PPTClassList;
            //ViewData["productClassList"] = productClassList;
            ViewData["pageCount"] = 0;
            ViewData["pageIndex"] = 0;
            ViewData["kw"] = "";
            return View("~/views/cms/PPTManager.cshtml");

        }

        //保存ppt内容
        [ActionName("save")]
        //[PPTAuthrize(permission = (int)(p.Add | p.Modify))]
        [ValidateInput(false)]
        public ActionResult PPTItemSave()
        {
            PPTItem PPTItem = new PPTItem();
            //保存到数据库
            if (Request.Form["PPTItemid"].ToString() == "0")
            {
                //新建下载
                //插入记录
                PPTItem.classId = Convert.ToInt32(Request.Form["classid"]);
                PPTItem.visible = false;//默认先隐藏ppt
                PPTItem.title = Request.Form["title"].ToString().FilterHttpGet();
                PPTItem.pptSrc = Request.Form["pptSrc"].ToString().FilterHttpGet();
                //PPTItem.thumbnailSrc = Request.Form["thumbnailSrc"].ToString().FilterHttpGet();
                PPTItem.description = Request.Form["description"].ToString().FilterHttpGet();
                //PPTItem.author = Request.Form["author"].ToString().FilterHttpGet();
                PPTItem.updateUser = "test";
                PPTItem.author = "test";
                PPTItem.updateDate = DateTime.Now;
                try
                {
                    PPTItem.validDate = DateTime.Parse(Request.Form["validDate"].ToString());
                }
                catch
                {
                    PPTItem.validDate = DateTime.Now;
                }
                //PPTItem.author = Session["uid"].ToString();//Convert.ToInt32(Session["uid"]);
                try
                {
                    //if (PPTItem.classId == 3)
                    //{
                    HttpPostedFileBase file = Request.Files[0];

                    string imageName = PPTItem.title + ".jpg";

                    string path = Server.MapPath(@"/content/thumbnail");
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    Image img = Image.FromStream(file.InputStream);
                    img.Save(path + @"/" + imageName);
                    PPTItem.thumbnailSrc = @"/content/thumbnail/" + imageName;
                    //}
                }
                catch (Exception)
                {
                }

                this.WebUnity.PPTItemRepository.Insert(PPTItem);
                this.WebUnity.Save();

                //lucene
                //SearchUnit su = new SearchUnit(PPTItem.id.ToString(), PPTItem.showName, PPTItem.suitableModels, PPTItem.description, PPTItem.classId.ToString(), PPTItem.publishDate, PPTItem.hits.ToString(), iscommon);
                //IndexManager.bookIndex.Add(su, "PPTItem");
            }
            else
            {
                //修改原有
                //修改记录
                PPTItem = this.WebUnity.PPTItemRepository.GetById(Convert.ToInt32(Request.Form["PPTItemid"]));
                PPTItem.classId = Convert.ToInt32(Request.Form["classid"]);
                //PPTItem.visible = false;//默认先隐藏ppt
                PPTItem.title = Request.Form["title"].ToString().FilterHttpGet();
                PPTItem.pptSrc = Request.Form["pptSrc"].ToString().FilterHttpGet();
                //PPTItem.thumbnailSrc = Request.Form["thumbnailSrc"].ToString().FilterHttpGet();
                PPTItem.description = Request.Form["description"].ToString().FilterHttpGet();
                //PPTItem.author = Request.Form["author"].ToString().FilterHttpGet();
                PPTItem.updateUser = "test";
                PPTItem.author = "test";
                PPTItem.updateDate = DateTime.Now;
                try
                {
                    PPTItem.validDate = DateTime.Parse(Request.Form["validDate"].ToString());
                }
                catch
                {
                    PPTItem.validDate = DateTime.Now;
                }
                //PPTItem.author = Session["uid"].ToString();//Convert.ToInt32(Session["uid"]);

                try
                {
                    //if (PPTItem.classId == 3)
                    //{
                    HttpPostedFileBase file = Request.Files[0];

                    string imageName = PPTItem.title + ".jpg";

                    string path = Server.MapPath(@"/content/thumbnail");
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    Image img = Image.FromStream(file.InputStream);
                    img.Save(path + @"/" + imageName);
                    PPTItem.thumbnailSrc = @"/content/thumbnail/" + imageName;
                    //}
                }
                catch (Exception)
                {
                }

                this.WebUnity.PPTItemRepository.Update(PPTItem);
                this.WebUnity.Save();

                //lucene
                //SearchUnit su = new SearchUnit(PPTItem.id.ToString(), PPTItem.showName, PPTItem.suitableModels, PPTItem.description, PPTItem.classId.ToString(), PPTItem.publishDate, PPTItem.hits.ToString(), iscommon);
                //IndexManager.bookIndex.Mod(su, "PPTItem");
            }
            ViewData["label"] = "service";
            ViewData["state"] = "editPPTItemSuccess";
            ViewData["msg"] = "操作成功";
            return View("~/views/cms/PPTItemSave.cshtml");
        }

        //隐藏ppt
        [ActionName("hide")]
        //[PPTAuthrize(permission = (int)p.Modify)]
        public ActionResult PPTItemHide()
        {
            PPTItem PPTItem = new PPTItem();
            List<PPTItem> PPTItemList = new List<PPTItem>();
            PPTItem = this.WebUnity.PPTItemRepository.GetById(Convert.ToInt32(Request.QueryString["id"]));
            bool state = false;
            PPTItem.visible = state;
            PPTItem.updateUser = "test";//Session["uid"].ToString();//Convert.ToInt32(Session["uid"]);
            PPTItem.updateDate = DateTime.Now;
            this.WebUnity.PPTItemRepository.Update(PPTItem);
            this.WebUnity.Save();

            //lucene
            //IndexManager.bookIndex.Del(PPTItem.id, "PPTItem");

            int pageIndex = null == Request.QueryString["p"] ? 1 : Convert.ToInt32(Request.QueryString["p"]);
            string keyword = null == Request.QueryString["kw"] ? "" : Request.QueryString["kw"].ToString();
            int recordCount = WebUnity.PPTItemRepository.Get(filter: t => keyword.Length > 0 ? t.title.IndexOf(keyword) > -1 : true).Count();
            PPTItemList = WebUnity.PPTItemRepository
                    .Get(pageIndex, 15, orderBy: q => q.OrderByDescending(t => t.updateDate), filter: t => keyword.Length > 0 ? t.title.IndexOf(keyword) > -1 : true)
                    .ToList<PPTItem>();
            int pageCount = recordCount % 15 == 0 ? recordCount / 15 : recordCount / 15 + 1;

            ViewData["label"] = "service";
            ViewData["state"] = "list";
            ViewData["PPTItem"] = PPTItem;
            ViewData["PPTItemList"] = PPTItemList;
            ViewData["PPTItemClassList"] = null;
            ViewData["productClassList"] = null;
            ViewData["pageCount"] = pageCount;
            ViewData["pageIndex"] = pageIndex;
            ViewData["kw"] = "";
            return View("~/views/cms/PPTManager.cshtml");
        }

        //显示下载
        [ActionName("show")]
        //[PPTAuthrize(permission = (int)p.Modify)]
        public ActionResult PPTItemShow()
        {
            PPTItem PPTItem = new PPTItem();
            List<PPTItem> PPTItemList = new List<PPTItem>();
            PPTItem = this.WebUnity.PPTItemRepository.GetById(Convert.ToInt32(Request.QueryString["id"]));
            bool state = true;
            PPTItem.visible = state;
            PPTItem.updateUser = "test";//Session["uid"].ToString();//Convert.ToInt32(Session["uid"]);
            PPTItem.updateDate = DateTime.Now;
            this.WebUnity.PPTItemRepository.Update(PPTItem);
            this.WebUnity.Save();

            //lucene
            //SearchUnit su = new SearchUnit(PPTItem.id.ToString(), PPTItem.showName, PPTItem.suitableModels, PPTItem.description, PPTItem.classId.ToString(), PPTItem.publishDate, PPTItem.hits.ToString(), iscommon);
            //IndexManager.bookIndex.Add(su, "PPTItem");

            int pageIndex = null == Request.QueryString["p"] ? 1 : Convert.ToInt32(Request.QueryString["p"]);
            string keyword = null == Request.QueryString["kw"] ? "" : Request.QueryString["kw"].ToString().FilterHttpGet();
            int recordCount = WebUnity.PPTItemRepository.Get(filter: t => keyword.Length > 0 ? t.title.IndexOf(keyword) > -1 : true).Count();
            PPTItemList = WebUnity.PPTItemRepository
                    .Get(pageIndex, 15, orderBy: q => q.OrderByDescending(t => t.updateDate), filter: t => keyword.Length > 0 ? t.title.IndexOf(keyword) > -1 : true)
                    .ToList<PPTItem>();
            int pageCount = recordCount % 15 == 0 ? recordCount / 15 : recordCount / 15 + 1;

            ViewData["label"] = "service";
            ViewData["state"] = "list";
            ViewData["PPTItem"] = PPTItem;
            ViewData["PPTItemList"] = PPTItemList;
            ViewData["PPTItemClassList"] = null;
            ViewData["productClassList"] = null;
            ViewData["pageCount"] = pageCount;
            ViewData["pageIndex"] = pageIndex;
            ViewData["kw"] = "";
            return View("~/views/cms/PPTManager.cshtml");
        }

        [ActionName("delete")]
        //[PPTAuthrize(permission = (int)p.Modify)]
        public ActionResult PPTItemDelete()
        {
            PPTItem PPTItem = new PPTItem();
            List<PPTItem> PPTItemList = new List<PPTItem>();
            PPTItem = this.WebUnity.PPTItemRepository.GetById(Convert.ToInt32(Request.QueryString["id"]));
            string pathPPT = string.Empty;
            string pathThumbnail = string.Empty;
            try
            {
                pathPPT = Server.MapPath(PPTItem.pptSrc);
                pathThumbnail = Server.MapPath(PPTItem.thumbnailSrc);
                if (System.IO.File.Exists(pathPPT))
                {
                    //如果存在则删除
                    System.IO.File.Delete(pathPPT);
                }
                if (System.IO.File.Exists(pathThumbnail))
                {
                    //如果存在则删除
                    System.IO.File.Delete(pathThumbnail);
                }
            }
            catch
            {
            }

            //lucene
            //IndexManager.bookIndex.Del(PPTItem.id, "PPTItem");

            this.WebUnity.PPTItemRepository.Delete(Convert.ToInt32(Request.QueryString["id"]));
            this.WebUnity.Save();

            int pageIndex = null == Request.QueryString["p"] ? 1 : Convert.ToInt32(Request.QueryString["p"]);
            string keyword = null == Request.QueryString["kw"] ? "" : Request.QueryString["kw"].ToString();
            int recordCount = WebUnity.PPTItemRepository.Get(filter: t => keyword.Length > 0 ? t.title.IndexOf(keyword) > -1 : true).Count();
            PPTItemList = WebUnity.PPTItemRepository
                    .Get(pageIndex, 15, orderBy: q => q.OrderByDescending(t => t.updateDate), filter: t => keyword.Length > 0 ? t.title.IndexOf(keyword) > -1 : true)
                    .ToList<PPTItem>();
            int pageCount = recordCount % 15 == 0 ? recordCount / 15 : recordCount / 15 + 1;

            ViewData["label"] = "service";
            ViewData["state"] = "list";
            ViewData["PPTItem"] = PPTItem;
            ViewData["PPTItemList"] = PPTItemList;
            ViewData["PPTItemClassList"] = null;
            ViewData["productClassList"] = null;
            ViewData["pageCount"] = pageCount;
            ViewData["pageIndex"] = pageIndex;
            ViewData["kw"] = "";
            return View("~/views/cms/PPTManager.cshtml");
        }

        #endregion

        //进入上传附件窗口
        [ActionName("upload")]
        //[PPTAuthrize(permission = (int)(p.Add | p.Modify))]
        public ActionResult Upload()
        {
            ViewData["label"] = "service";
            ViewData["state"] = "upload";
            ViewData["uploadErrors"] = new List<string>();
            ViewData["fileInfo"] = new List<string>();
            return View("~/views/cms/PPTUpload.cshtml");
        }

        //上传附件ppt
        [ActionName("uploadSavePPT")]
        //[PPTAuthrize(permission = (int)(p.Add | p.Modify))]
        public ActionResult UploadResultPPT()
        {
            //错误列表
            List<string> uploadErrors = new List<string>();

            // 1、文件名（包含除去ppt的路径）；2、文件大小；3、文件显示名
            List<string> fileInfo = new List<string>();

            string result = "success";
            try
            {
                // 上传到根目录下的~/content/ppt     * 按月份新建文件夹       * 命名按照原来的文件名  
                HttpPostedFileBase file = Request.Files["file1"];

                //判断文件是否合法
                if (isAllowPPT(uploadErrors, file))
                {
                    //文件合法，开始上传
                    string month = DateTime.Now.Month.ToString();
                    month = Convert.ToInt32(month) < 10 ? "0" + month : month;
                    string path = Server.MapPath("/content/ppt/" + DateTime.Now.Year.ToString() + month);
                    string fName;
                    if (file.FileName.IndexOf('\\') > -1)
                    {
                        fName = file.FileName.Substring(file.FileName.LastIndexOf('\\') + 1);
                    }
                    else
                    {
                        fName = file.FileName;
                    }
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    file.SaveAs(path + "/" + fName);
                    fileInfo.Add(("/content/ppt/" + DateTime.Now.Year.ToString() + month + "/" + fName));
                    fileInfo.Add((((float)(file.ContentLength * 1.00 / (1024 * 1024))).ToString("f2") + "MB"));
                    fileInfo.Add(fName);
                }
                else
                {
                    result = "fail";
                }
            }
            catch
            {
                uploadErrors.Add("上传失败");
                result = "fail";
            }
            ViewData["uploadErrors"] = uploadErrors;
            ViewData["fileInfo"] = fileInfo;
            ViewData["label"] = "service";
            ViewData["state"] = result;
            return View("~/views/cms/PPTUpload.cshtml");
        }

        //上传附件略缩图
        [ActionName("uploadSaveThumbnail")]
        //[PPTAuthrize(permission = (int)(p.Add | p.Modify))]
        public ActionResult UploadResultThumbnail()
        {
            //错误列表
            List<string> uploadErrors = new List<string>();

            // 1、文件名（包含除去ppt的路径）；2、文件大小；3、文件显示名
            List<string> fileInfo = new List<string>();

            string result = "success";
            try
            {
                // 上传到根目录下的~/content/ppt     * 按月份新建文件夹       * 命名按照原来的文件名  
                HttpPostedFileBase file = Request.Files["file1"];

                //判断文件是否合法
                if (isAllowImg(uploadErrors, file))
                {
                    //文件合法，开始上传
                    string month = DateTime.Now.Month.ToString();
                    month = Convert.ToInt32(month) < 10 ? "0" + month : month;
                    string path = Server.MapPath("/content/thumbnail/" + DateTime.Now.Year.ToString() + month);
                    string fName;
                    if (file.FileName.IndexOf('\\') > -1)
                    {
                        fName = file.FileName.Substring(file.FileName.LastIndexOf('\\') + 1);
                    }
                    else
                    {
                        fName = file.FileName;
                    }
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    file.SaveAs(path + "/" + fName);
                    fileInfo.Add(("/content/thumbnail/" + DateTime.Now.Year.ToString() + month + "/" + fName));
                    fileInfo.Add((((float)(file.ContentLength * 1.00 / (1024 * 1024))).ToString("f2") + "MB"));
                    fileInfo.Add(fName);
                }
                else
                {
                    result = "fail";
                }
            }
            catch
            {
                uploadErrors.Add("上传失败");
                result = "fail";
            }
            ViewData["uploadErrors"] = uploadErrors;
            ViewData["fileInfo"] = fileInfo;
            ViewData["label"] = "service";
            ViewData["state"] = result;
            return View("~/views/cms/PPTUpload.cshtml");
        }

        #region

        private const int pptSize = 30;//ppt大小限制（MB）
        private const int thumbnailSize = 30;//略缩图大小限制（MB）

        // 判断文件大小，不超过30MB  判断文件后缀，只允许ppt,pptx
        private bool isAllowPPT(List<string> uploadErrors, HttpPostedFileBase file)
        {
            if (file.ContentLength == 0)
            {
                uploadErrors.Add("未找到文件");
                return false;
            }
            if ((file.ContentLength / (1024 * 1024)) > pptSize)
            {
                uploadErrors.Add("文件大小超过30MB");
                return false;
            }
            if (getFilePostfix(file.FileName).ToLower() != "ppt" &&
                getFilePostfix(file.FileName).ToLower() != "pptx")
            {
                uploadErrors.Add("文件类型只能为“ppt或pptx”");
                return false;
            }
            return true;
        }

        // 判断文件大小，不超过30MB  判断文件后缀，只允许jpg,png,jpeg,gif
        private bool isAllowImg(List<string> uploadErrors, HttpPostedFileBase file)
        {
            if (file.ContentLength == 0)
            {
                uploadErrors.Add("未找到文件");
                return false;
            }
            if ((file.ContentLength / (1024 * 1024)) > thumbnailSize)
            {
                uploadErrors.Add("文件大小超过30MB");
                return false;
            }
            if (getFilePostfix(file.FileName).ToLower() != "jpg" &&
                getFilePostfix(file.FileName).ToLower() != "png" &&
                getFilePostfix(file.FileName).ToLower() != "jpeg" &&
                getFilePostfix(file.FileName).ToLower() != "gif")
            {
                uploadErrors.Add("文件类型只能为“jpg、png、jpeg或gif”");
                return false;
            }
            return true;
        }

        //获取文件后缀名
        private string getFilePostfix(string fileName)
        {
            return fileName.Substring(fileName.LastIndexOf('.') + 1);
        }

        #endregion

        #region 邮件
        /// <summary> 
        /// 邮件发送(Service邮箱),默认编码为GB2312 
        /// </summary> 
        /// <param name="strTo"></param> 
        /// <param name="strCc"></param> 
        /// <param name="strSubject"></param> 
        /// <param name="strBody"></param> 
        /// <param name="strEncoding">编码，如果为空，默认为GB2312</param> 
        /// <returns></returns> 
        public bool ServiceSendMail(string strTo, string strCc, string strSubject, string strBody, string strEncoding)
        {
            return common(strTo, strCc, strSubject, strBody, strEncoding);
        }

        /// <summary> 
        /// 邮件发送默认编码为GB2312 
        /// </summary> 
        /// <param name="strTo"></param> 
        /// <param name="strSubject"></param> 
        /// <param name="strBody"></param> 
        /// <returns></returns> 
        public bool ServiceSendMail(string strTo, string strSubject, string strBody)
        {
            return common(strTo, "", strSubject, strBody, "");
        }

        private static bool common(string strTo, string strCc, string strSubject, string strBody, string strEncoding)
        {
            bool bState = false;

            try
            {
                //编码暂硬性规定为GB2312 
                Encoding encoding = Encoding.GetEncoding(936);

                MailMessage Message = new MailMessage(
                new MailAddress("1234567@qq.com", "1234567", encoding),
                new MailAddress(strTo));

                Message.SubjectEncoding = encoding;
                Message.Subject = strSubject;
                Message.BodyEncoding = encoding;
                Message.Body = strBody;
                if (strCc != "")
                {
                    Message.CC.Add(new MailAddress(strCc));
                }
                SmtpClient smtpClient = new SmtpClient("smtp.sina.com");
                smtpClient.Credentials = new NetworkCredential("hanjunhui127", "1984127");
                smtpClient.Timeout = 999999;
                smtpClient.Send(Message);

                bState = true;


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return bState;
        }

        public void SendMailLocalhost()
        {
            MailMessage msg = new MailMessage();
            msg.To.Add("1234567@qq.com");
            //msg.To.Add("b@b.com");    
            /* msg.To.Add("b@b.com");   
            * msg.To.Add("b@b.com");   
            * msg.To.Add("b@b.com");可以发送给多人   
            */
            //msg.CC.Add("c@c.com");    
            /*   
            * msg.CC.Add("c@c.com");   
            * msg.CC.Add("c@c.com");可以抄送给多人   
            */
            msg.From = new MailAddress("aaa", "a", Encoding.UTF8);
            /* 上面3个参数分别是发件人地址（可以随便写），发件人姓名，编码*/
            msg.Subject = "这是测试邮件";//邮件标题    
            msg.SubjectEncoding = Encoding.UTF8;//邮件标题编码    
            msg.Body = "邮件内容";//邮件内容    
            msg.BodyEncoding = Encoding.UTF8;//邮件内容编码    
            msg.IsBodyHtml = false;//是否是HTML邮件    
            msg.Priority = MailPriority.High;//邮件优先级    

            SmtpClient client = new SmtpClient();
            client.Host = "localhost";
            object userState = msg;
            try
            {
                client.SendAsync(msg, userState);
                //简单一点儿可以client.Send(msg);    
                //MessageBox.Show("发送成功");    
            }
            catch (SmtpException ex)
            {
                //MessageBox.Show(ex.Message, "发送邮件出错");    
            }
        }



        #endregion

        #region
        [ActionName("login")]
        public ActionResult login()
        {
            ViewData["username"] = "";
            ViewData["codeErroe"] = "";
            ViewData["password"] = "";
            ViewData["loginError"] = "";
            ViewData["error"] = "";
            return View("~/views/cms/Login.cshtml");
        }

        [ActionName("loginOn")]
        public ActionResult LoginOn(string username, string password, string code)
        {
            //简单的过滤自拼接表单
            if (Request.Form["flage"] == "true")
            {
                try
                {
                    if (Session["checkcode"].ToString().ToLower() != code.ToLower())
                    {
                        ViewData["username"] = username;
                        ViewData["password"] = password;
                        ViewData["loginError"] = "";
                        ViewData["codeError"] = "验证码错误";
                        ViewData["error"] = "";
                        return View("~/views/cms/Login.cshtml");
                    }
                    else if (!checkLogin(username.FilterHttpGet(), password.FilterHttpGet()))
                    {
                        ViewData["username"] = username;
                        ViewData["password"] = password;
                        ViewData["loginError"] = "用户名或密码错误";
                        ViewData["codeError"] = "";
                        ViewData["error"] = "";
                        return View("~/views/cms/Login.cshtml");
                    }
                    else
                    {
                        string tmpUsername = username.FilterHttpGet();
                        //Operator user = this.WebUnity.OperatorRepository
                        //.Get(filter: t => t.userName == tmpUsername)
                        //.First();
                        //user.loginDate = DateTime.Now;
                        
                        //Session.Timeout = 30;
                        //List<Permission> pList = user.Permissions.ToList<Permission>();
                        //Hashtable ht = new Hashtable();
                        //foreach (Permission p in pList)
                        //{
                        //    ht[p.mid] = p.permissionValue;
                        //}
                        ////把登录人员id和权限哈希表存入session
                        //Session["uid"] = user.id;
                        //Session["permission"] = ht;
                        //ViewData["userName"] = user.userName;
                        //ViewData["label"] = "No";

                        return View("~/views/cms/Login.cshtml");
                    }
                }
                catch
                {
                    //异常，重新登录
                    ViewData["username"] = "";
                    ViewData["codeError"] = "";
                    ViewData["password"] = "";
                    ViewData["loginError"] = "";
                    ViewData["error"] = "连接超时，请重新登陆";
                    return View("~/views/cms/Login.cshtml");

                }
            }
            else
            {
                //非法表单，重新登录
                ViewData["error"] = "登陆异常，请重新登陆";
                ViewData["username"] = "";
                ViewData["codeError"] = "";
                ViewData["password"] = "";
                ViewData["loginError"] = "";
                return View("~/views/cms/Login.cshtml");
            }
        }

        [ActionName("code")]
        public ActionResult GetValidateCode()
        {
            ValidateCode vCode = new ValidateCode();
            byte[] bytes = vCode.CreateValidateGraphic();
            return File(bytes, @"image/jpeg");
        }

        private bool checkLogin(string u, string p)
        {
            if (u == "test" && p == "123456")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion
    }
}
