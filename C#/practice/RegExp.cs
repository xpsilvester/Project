using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace practice
{
    class RegExp
    {
        public void reg()
        {
            String r1 = "r1";
            string r2 = "r1";

            Console.WriteLine(r1.Equals(r2));

            string greetingText = "Hello from all the guys at Wrox Press.";
            greetingText += "We do hope you enjoy this book as much as we enjoyed writing it .";
            Console.WriteLine(greetingText);
            for (int i = 'z'; i >= 'a'; i--)
            {
                char old1 = (char)i;
                char new1 = (char)(i + 1);
                greetingText=greetingText.Replace(old1,new1);
            }

            for (int i = 'Z'; i >= 'A'; i--)
            {
                char old1 = (char)i;
                char new1 = (char)(i + 1);
                greetingText = greetingText.Replace(old1, new1);
            }

            Console.WriteLine(greetingText);

            StringBuilder greetingBuilder = new StringBuilder("Hello from all guys at Wrox Press.", 150);
            greetingBuilder.AppendFormat("We do hope you enjoy this book as much as we enjoyed writing it");
            Console.WriteLine(greetingBuilder);

            const string myText = @"This comprehensive compendium provides a broad and thorough investigation of all aspects of programming with ASP.NET. Entirely revised and updated for the fourth release of .NET,this book will give you the information you need to master ASP.NET and build a dynamic, successful, enterprise Web application.";
            //const string pattern = "ion";
            const string pattern = @"\ba\S*ion\b";
            MatchCollection myMatches = Regex.Matches(myText, pattern, RegexOptions.IgnoreCase | RegexOptions.ExplicitCapture);

            foreach (Match nextMatch in myMatches)
            {
                Console.WriteLine(nextMatch.Index);
            }
        }



    }
}
