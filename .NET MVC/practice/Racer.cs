using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace practice
{
    [Serializable]
    public class Racer : IComparable<Racer>, IFormattable
    {
        public int Id { get; private set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public int Wins { get; set; }
        public Racer(int id, string firstName, string lastName, string country)
            : this(id, firstName, lastName, country, wins: 0)
        { }

        public Racer(int id, string firstName, string lastName, string country, int wins)
        {
            this.Id = id;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Country = country;
            this.Wins = wins;
        }

        public override string ToString()
        {
            return String.Format("{0} {1}", FirstName, LastName);
        }

        public string ToString(string format, IFormatProvider formatProvider)
        {
            if (format == null) format = "N";
            switch (format.ToUpper())
            {
                case "N"://name
                    return ToString();
                case "F"://first name
                    return FirstName;
                case "L"://last name
                    return LastName;
                case "W"://wins
                    return String.Format("{0},Wins:{1}", ToString(), Wins);
                case "C"://Country
                    return String.Format("{0},Country:{1}", ToString(), Country);
                case "A"://All
                    return String.Format("{0},{1} Wins:{2}", ToString(), Country, Wins);
                default:
                    throw new FormatException(String.Format(formatProvider, "Format {0} is not supported", format));
            }
        }
        public string ToString(string format)
        {
            return ToString(format, null);
        }

        public int CompareTo(Racer other)
        {
            if (other == null) return -1;
            int compare = string.Compare(this.LastName, other.LastName);
            if (compare == 0)
                return string.Compare(this.FirstName, other.FirstName);
            return compare;
        }

    }


    public class test
    {
        public void racerTest()
        {
            var intList = new List<int>();
            intList.Add(1);
            intList.Add(2);
            var stringList = new List<string>();
            stringList.Add("one");
            stringList.Add("two");

            //-----------------------

            var graham = new Racer(7, "Graham", "Hill", "UK", 14);
            var emerson = new Racer(13, "Emerson", "Fittipaldi", "Brazil", 14);
            var mario = new Racer(16, "Mario", "Andretti", "USA", 12);

            var racers = new List<Racer>(20) { graham, emerson, mario };

            racers.Add(new Racer(24, "Michael", "Schumacher", "Germany", 91));
            racers.Add(new Racer(27, "Mika", "Hakkinen", "Finland", 20));

            racers.AddRange(new Racer[]{
                new Racer(14,"Niki","Lauda","Austria",25),
                new Racer(21,"Alain","Prost","France",51)});

            racers.Insert(3, new Racer(6, "Phil", "Hill", "USA", 3));

            Racer r1 = racers[3];

            for (int i = 0; i < racers.Count; i++)
            {
                Console.WriteLine(racers[i]);
            }

            foreach (Racer r in racers)
            {
                Console.WriteLine(r);
            }

            racers.RemoveAt(3);

            int index1 = racers.IndexOf(mario);

            racers.Sort();
            racers.ForEach(Console.WriteLine);
        }
    }

    public class RacerComparer : IComparer<Racer>
    {
        public enum CompareType
        {
            FirstName,
            LastName,
            Country,
            Wins
        }

        private CompareType compareType;

        public RacerComparer(CompareType compareType)
        {
            this.compareType = compareType;
        }

        public int Compare(Racer x, Racer y)
        {
            if (x == null && y == null) return 0;
            if (x == null) return -1;
            if (y == null) return 1;
            int result;
            switch (compareType)
            {
                case CompareType.FirstName:
                    return string.Compare(x.FirstName, y.FirstName);
                case CompareType.LastName:
                    return string.Compare(x.LastName, y.LastName);
                case CompareType.Country:
                    result = string.Compare(x.Country, y.Country);
                    if (result == 0)
                        return string.Compare(x.LastName, y.LastName);
                    else
                        return result;
                case CompareType.Wins:
                    return x.Wins.CompareTo(y.Wins);
                default:
                    throw new ArgumentException("Invalid Compare Type");

            }
        }
    }
        
    
}
