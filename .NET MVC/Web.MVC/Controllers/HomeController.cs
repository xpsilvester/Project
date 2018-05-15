using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Mvc.DAL;
using Web.Mvc.Model;
using Web.MVC.Controllers;

namespace Web.Mvc.Controllers
{
    public class HomeController : BaseController
    {
        //
        // GET: /Home/
        public ActionResult Index(string classname = "通用资源")
        {
            List<PPTItem> items = new List<PPTItem>();
            if (classname.Equals("通用资源"))
            {
                items = this.WebUnity.PPTItemRepository.getPPTItemByParentClassId(2).ToList<PPTItem>();
            }
            else if (classname.Equals("产品介绍"))
            {
                items = this.WebUnity.PPTItemRepository.getPPTItemByParentClassId(3).ToList<PPTItem>();
            }
            else if (classname.Equals("行业案例"))
            {
                items = this.WebUnity.PPTItemRepository.getPPTItemByParentClassId(1).ToList<PPTItem>();
            }
            else
            {
                items = this.WebUnity.PPTItemRepository.getPPTItemInIndexOther().ToList<PPTItem>();
            }

            ViewData["PPTItems"] = items;
            ViewData["classname"] = classname;
            return View();
        }
        
    }
}