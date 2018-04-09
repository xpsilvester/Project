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
}
