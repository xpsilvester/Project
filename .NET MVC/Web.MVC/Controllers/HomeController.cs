using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Mvc.DAL;
using Web.Mvc.Model;

namespace Web.Mvc.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        protected UnitOfWork WebUnity;
        public ActionResult Index()
        {
            this.WebUnity = new UnitOfWork();
            List<PPTClass> classList = WebUnity.PPTClassRepository.GetPPTClassList().ToList<PPTClass>();
            ViewData["classList"] = classList;
            return View();
        }
        
    }
}