using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web.Mvc.Dal;
using Web.Mvc.Model;

namespace Web.Mvc.DAL
{
    public class PPTClassRepository : EntityRepository<Model.PPTClass>
    {
        public PPTClassRepository(PPTContext context)
            : base(context)
        { }

        public List<PPTClass> GetPPTClassList()
        {
            //return context.PPTClasses.Where(t => t.classLevel == 2).ToList<PPTClass>();
            return context.PPTClasses.ToList<PPTClass>();
        }
    }
}