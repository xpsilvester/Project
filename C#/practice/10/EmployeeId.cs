using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace practice._10
{
    [Serializable]
    public class EmployeeIdException : Exception
    {
        public EmployeeIdException(string message) : base(message) { }
    }
    [Serializable]
    public struct EmployeeId : IEquatable<EmployeeId>
    {
        private readonly char prefix;
        private readonly int number;

        public EmployeeId(string id)
        {
            Contract.Requires<ArgumentNullException>(id != null);
            prefix = (id.ToUpper())[0];
            int numLength = id.Length - 1;
            try
            {
                number = int.Parse(id.Substring(1, numLength > 6 ? 6 : numLength));
            }
            catch (FormatException)
            {
                throw new EmployeeIdException("Invalid EmployeeId format");
            }
        }

        public override string ToString()
        {
            return prefix.ToString() + string.Format("{0,6:000000}", number);
        }

        public override int GetHashCode()
        {
            return (number ^ number << 16) * 0x15051505;
        }

        public bool Equals(EmployeeId other)
        {
            if (other.Equals(null)) return false;
            return (prefix == other.prefix && number == other.number);
        }

        public override bool Equals(object obj)
        {
            return Equals((EmployeeId)obj);
        }

        public static bool operator ==(EmployeeId left, EmployeeId right)
        {
            return left.Equals(right);
        }

        public static bool operator !=(EmployeeId left, EmployeeId right)
        {
            return !(left == right);
        }

    }
}
