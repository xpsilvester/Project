using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace practice
{
    class UseShell
    {
        public void excute()
        {
            ProcessStartInfo psi = new ProcessStartInfo();
            psi.FileName = "/usr/local/bin/content";
            psi.UseShellExecute = false;
            psi.RedirectStandardOutput = true;
            psi.Arguments = "font-spider index.html";

            Process p = Process.Start(psi);
            string strOutput = p.StandardOutput.ReadToEnd();
            p.WaitForExit();
            Console.WriteLine(strOutput);
        }
    }
}
