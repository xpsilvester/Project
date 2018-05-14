using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Mvc.DAL;
using Web.Mvc.Model;

namespace Web.Mvc.Controllers
{
    public class CmsController : Controller
    {
        //
        // GET: /Cms/
        protected UnitOfWork WebUnity;

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PPTManager()
        {
            return View();
        }
        public ActionResult PPTEdit()
        {
            this.WebUnity = new UnitOfWork();
            List<PPTClass> classList = WebUnity.PPTClassRepository.GetPPTClassList().ToList<PPTClass>();
            ViewData["classList"] = classList;
            return View();
        }
        public ActionResult PPTUpload()
        {
            this.WebUnity = new UnitOfWork();
            List<PPTClass> classList = WebUnity.PPTClassRepository.GetPPTClassList().ToList<PPTClass>();
            ViewData["classList"] = classList;
            return View();
        }
    }
}
