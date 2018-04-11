using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace practice.Reflection
{
    [LastModified("14 Fed 2010","IEnumerable interface implemented"+
        "So Vector can now be treated as a collection")]
    [LastModified("10 Feb 2010","IFormattable interface implemented"+
        "So Vector now responds to format specifiers N and VE")]
    class Vector : IFormattable,IEnumerable
    {
        public double x, y, z;

        public Vector(double x, double y, double z)
        {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        [LastModified("10 Feb 2010",
            "Method added in order to provide formatting support")]
        public string ToString(string format, IFormatProvider formatProvider)
        {
            if (format == null)
            {
                return ToString();
            }
            return "true";
        }

    }
}
