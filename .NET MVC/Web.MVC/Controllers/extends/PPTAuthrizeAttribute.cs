using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Web;
using System.Collections;
using Web.MVC.Controllers;

namespace Web.Mvc.Controllers.extend
{
    public class PPTAuthrizeAttribute : ActionFilterAttribute
    {
        public int permission ;

        //用户权限判断，读取session中的用户权限的hashtable，
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                int model = ((BaseController)filterContext.Controller).Module;
                Hashtable ht = new Hashtable();
                ht = System.Web.HttpContext.Current.Session["permission"] as Hashtable;
                int userPermission = int.Parse(ht[model].ToString()); //获取当前模块权限
                //通过按位与 & 判断用户拥有的权限值是否包含有此模块所需权限值
                if ((int)(permission & userPermission) != permission) 
                {
                    //没有权限
                    filterContext.Result = new RedirectResult("/cms/main/permission.html");
                }
                return;
            }
            catch
            {
                //如果报错，重新登录
                filterContext.Result = new RedirectResult("/cms/main/login.html");
                return;
            }
        }
    }
}
