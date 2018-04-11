using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace practice.DataLib
{
    class Program
    {
        private static void LinqQuery()
        {
            var query = from r in Formula1.GetChampions()
                        where r.Country == "Brazil"
                        orderby r.Wins descending
                        select r;
            foreach (Racer r in query)
            {
                Console.WriteLine("{0:A}", r);
            }
        }
    }
}
