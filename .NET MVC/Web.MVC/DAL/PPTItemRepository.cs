using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Web.Mvc.Dal;
using Web.Mvc.Model;

namespace Web.Mvc.DAL
{
    public class PPTItemRepository : EntityRepository<Model.PPTItem>
    {
        public PPTItemRepository(PPTContext context)
            : base(context)
        { }

        /**
         * 用于首页获取普通二级分类
         */
        public List<PPTItem> getPPTItemByParentClassId(int parentClassId)
        {
            List<PPTItem> result;
            //StringBuilder su = new StringBuilder(string.Format(@"select pi.* from PPTItem pi inner join PPTClass pc on pi.classId = pc.id where pi.visible = 1 and pc.parentClassId = {0}", parentClassId.ToString()));
            //result = context.Database.SqlQuery<PPTItem>(su.ToString()).ToList<PPTItem>();
            List<int> classIds = context.PPTClasses.Where(t => t.parentClassId == parentClassId).Select(t => t.id).ToList();
            result = context.PPTItems.Where(d => classIds.Contains(d.classId)).ToList<PPTItem>();

            return result;
        }

        /**
         * 用于首页获取其它的二级分类
         */
        public List<PPTItem> getPPTItemInIndexOther()
        {
            List<PPTItem> result;
            //StringBuilder su = new StringBuilder(@"select pi.* from PPTItem pi inner join PPTClass pc on pi.classId = pc.id where pi.visible = 1 and pc.classTip = 'other' and pc.parentClassId = 0");
            //result = context.Database.SqlQuery<PPTItem>(su.ToString()).ToList<PPTItem>();
            PPTClass PPTClass = context.PPTClasses.Where(t => t.classTip.Equals("other") && t.parentClassId == 0).First();
            result = context.PPTItems.Where(d => d.classId.Equals(PPTClass.id) && d.visible).ToList<PPTItem>();
            return result;
        }

        /**
         * 获取ppt列表,包含搜索功能
         */
        //public List<PPTItem> getPPTList(string keyword)
        //{
        //    List<PPTItem> result;
            

        //    return result;
        //}

    }
}