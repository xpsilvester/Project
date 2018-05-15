using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace System.Web.Mvc.Html
{
    public static class CustomExtensins
    {
        
        /// <summary>
        /// 获取Action的URL链接
        /// </summary>
        /// <param name="htmlHelper"></param>
        /// <param name="ControllerName">控制器名称</param>
        /// <param name="ActionName">动作名称</param>
        /// <returns>字符串URL</returns>
        public static string ActionUrl(this HtmlHelper htmlHelper, string ControllerName, string ActionName)
        {
            return UrlHelper.GenerateUrl(null, ActionName, ControllerName, null, RouteTable.Routes, htmlHelper.ViewContext.RequestContext, false);
        }
        /// <summary>
        /// 获取Action的URL链接
        /// </summary>
        /// <param name="htmlHelper"></param>
        /// <param name="ControllerName">控制器名称</param>
        /// <param name="values">路由参数</param>
        /// <returns></returns>
        public static string ActionUrl(this HtmlHelper htmlHelper,string ControllerName,object values)
        {
            return ActionUrl(htmlHelper, ControllerName, null, values);
        }
        
        /// <summary>
        /// 获取Action的URL链接
        /// </summary>
        /// <param name="htmlHelper"></param>
        /// <param name="ControllerName">控制器名称</param>
        /// <param name="ActionName">动作名称</param>
        /// <param name="values">路由参数</param>
        /// <returns>字符串URL</returns>
        public static string ActionUrl(this HtmlHelper htmlHelper, string ControllerName, string ActionName, object values)
        {
            RouteValueDictionary routeValues=new RouteValueDictionary(values);
            return UrlHelper.GenerateUrl(null, ActionName, ControllerName, routeValues, RouteTable.Routes, htmlHelper.ViewContext.RequestContext, false);
        }
        /// <summary>
        /// 首页
        /// </summary>
        /// <param name="htmlHelper"></param>
        /// <returns>首页</returns>
        public static string ActionUrl(this HtmlHelper htmlHelper)
        {
            return ActionUrl(htmlHelper, "Home", "Index");
        }
    }
}