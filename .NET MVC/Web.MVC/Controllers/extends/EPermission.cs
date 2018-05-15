using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Mvc.Controllers.extend
{
    //用户权限，增删改查，通过按位或 | 操作，保证任何权限的组合的数值的唯一性
     public enum PermissonEnum : int
     {
         Add = 1,
         Delete = 2,
         Modify = 4,
         Search = 8
     }
}
