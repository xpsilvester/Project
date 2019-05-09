using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Mvc.DAL;

namespace Web.MVC.Controllers
{
    public class BaseController : Controller
    {
        public int Module;
        protected UnitOfWork WebUnity;
        protected const int MODULE_SYSTEM = 1;
        protected const int MODULE_PASSWORD = 2;
        protected const int MODULE_PRODUCT = 3;
        protected const int MODULE_DOWNLOAD = 4;
        protected const int MODULE_ARTICLE = 5;
        protected const int MODULE_VIDEO = 6;
        protected const int MODULE_OTHERS = 7;

        public BaseController()
            : base()
        {
            this.WebUnity = new UnitOfWork();
            this.Module = -1;
        }

        public new void Dispose()
        {
            base.Dispose();
            this.WebUnity.Dispose();
        }

    }
}
