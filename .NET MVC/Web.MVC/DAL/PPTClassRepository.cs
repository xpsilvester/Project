using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TPLINK.Task.PPTService.Dal;
using TPLINK.Task.PPTService.Model;

namespace TPLINK.Task.PPTService.DAL
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