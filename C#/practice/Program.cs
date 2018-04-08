using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace practice
{
    public enum TimeOfDay
    {
        Morning=0,
        Afternoon=1,
        Evening=2
    }
    class Program
    {
        public int Age { get; set; }
        private delegate string GetAString();
        delegate double DoubleOp(double x);

        static void Main(string[] args)
        {
            Console.WriteLine("Pi is " + MathTest.GetPi());
            int x = MathTest.GetSquareOf(5);
            Console.WriteLine("Square of 5 is " + x);

            MathTest math = new MathTest();

            math.value = 30;
            Console.WriteLine("Value field of math variable contains " + math.value);
            Console.WriteLine("Square of 30 is " + math.GetSquare());

            int i = 0;
            int[] ints = { 0, 1, 2, 4, 8 };

            Console.WriteLine("i = " + i);
            Console.WriteLine("ints[0] = " + ints[0]);
            Console.WriteLine("Calling SomeFunction.");

            ParameterTest.SomeFunction(ints,ref i);
            Console.WriteLine("i = " + i);
            Console.WriteLine("ints[0] = " + ints[0]);

            ParameterTest test = new ParameterTest();
            test.TestMethod(12);

            Program p=new Program();
            //p.Age=20;
            Console.WriteLine(p.Age);

            MyNumber num = new MyNumber(43);

            var doctor = new { FirstName = "James", MiddleName = "T", LastName = "Kirk" };
            Console.WriteLine(doctor.FirstName);

            SaverAccount counter = new SaverAccount();
            counter.PayIn(399);
            counter.Withdraw(100);
            Console.WriteLine(counter.ToString());

            int num1 = 4;
            Console.WriteLine(num1 & (-num1));

            fanxing fx = new fanxing();
            fx.boxing();
            fx.noBoxing();

            var list1 = new LinkedList();
            list1.AddLast(2);
            list1.AddLast(4);

            foreach (int k in list1)
            {
                Console.WriteLine(k);
            }

            var dm = new DocumentManager<Document>();
            dm.AddDocument(new Document("Title A", "Sample A"));
            dm.AddDocument(new Document("Title B", "Sample B"));

            dm.DisplayAllDocuments();

            if (dm.IsDocumentAvailable)
            {
                Document d = dm.GetDocument();
                Console.WriteLine(d.Content);
            }

            int t = 40;
            GetAString firstStringMethod = t.ToString;
            Console.WriteLine("String is {0}", firstStringMethod());

            Currency balance = new Currency(34, 50);

            firstStringMethod = balance.ToString;
            Console.WriteLine("String is {0}", firstStringMethod());

            firstStringMethod = new GetAString(Currency.GetCurrencyUnit);
            Console.WriteLine("String is {0}", firstStringMethod());

            DoubleOp[] operations =
            {
                MathOperations.MultiplyByTwo,
                MathOperations.Square
            };

            for (int q = 0; q < operations.Length; q++)
            {
                Console.WriteLine("Using operations[{0}]:", q);
                ProcessAndDisplayNumber(operations[q], 2.0);
                ProcessAndDisplayNumber(operations[q], 7.94);
                ProcessAndDisplayNumber(operations[q], 1.414);
                Console.WriteLine();
            }

            Employee[] employees =
            {
                new Employee("Bugs Bunny",20000),
                new Employee("Elmer Fudd",10000),
                new Employee("Daffy Duck",25000),
                new Employee("Will Coyote",1000000.38m),
                new Employee("Foghorn Leghorn",23000),
                new Employee("RoadRunner",50000)
            };

            BubbleSorter.Sort(employees, Employee.CompareSalary);

            foreach (var employee in employees)
            {
                Console.WriteLine(employee);
            }

            string mid = ",middle part,";
            Func<string, string> anonDel = delegate(string param)
            {
                param += mid;
                param += " and this was added to the string.";
                return param;
            };
            Console.WriteLine(anonDel("Start of string"));

            Func<string, string> lambda = param =>
            {
                param += mid;
                param += " and this was added to the string.";
                return param;
            };
            Console.WriteLine(lambda("Start of string"));

            RegExp reg = new RegExp();
            reg.reg();

            Spider spider = new Spider();
            //spider.autoExcute();
            spider.WatcherStrat(@"D:\Documents and Settings\Desktop\SourceHanSansCN", "*.html");
            Console.ReadKey();


        }
        static void ProcessAndDisplayNumber(DoubleOp action, double value)
        {
            double result = action(value);
            Console.WriteLine("Value is {0},result of operation is {1}", value, result);
        }


    }
    class fanxing
    {
        //装箱，拆箱操作
        public void boxing()
        {
            var list = new ArrayList();
            list.Add(44);//装箱，把int转成list对象，值类型转为引用类型
            list.Add(24);

            int i1 = (int)list[0];//拆箱，将list转为int

            foreach (int i2 in list)
            {
                Console.WriteLine(i2);//拆箱
            }
        }
        //不进行装箱和拆箱
        public void noBoxing()
        {
            var list = new List<int>();
            list.Add(44);//不装箱，值存储在List<int>中
            list.Add(24);

            int i1 = list[0];

            foreach (int i2 in list)
            {
                Console.WriteLine(i2);
            }
            

        }
    }
    public class LinkedListNode
    {
        public LinkedListNode(object value)
        {
            this.Value = value;
        }
        public object Value { get; internal set; }

        public LinkedListNode Next { get; internal set; }
        public LinkedListNode Prev { get; internal set; }
    }
    public class LinkedList : IEnumerable
    {
        public LinkedListNode First { get; private set; }
        public LinkedListNode Last { get; private set; }

        public LinkedListNode AddLast(object node)
        {
            var newNode = new LinkedListNode(node);
            if (First == null)
            {
                First = newNode;
                Last = First;
            }
            else
            {
                LinkedListNode previous = Last;
                Last.Next = newNode;
                Last = newNode;
                Last.Prev = previous;
            }
            return newNode;
        }
        public IEnumerator GetEnumerator()
        {
            LinkedListNode current = First;
            while (current != null)
            {
                yield return current.Value;
                current = current.Next;
            }
        }
    }

    class MathTest
    {
        public int value;
        public int GetSquare()
        {
            return value * value;
        }
        public static int GetSquareOf(int x)
        {
            return x * x;
        }
        public static double GetPi()
        {
            return 3.14159;
        }
    }

    class ParameterTest
    {
        public static void SomeFunction(int[] ints,ref int i)
        {
            ints[0] = 100;
            i = 100;
        }

        public void TestMethod(int notOptionalNumber, int optionalNumber = 10)
        {
            Console.WriteLine(optionalNumber + notOptionalNumber);
        }
    }

    public class MyNumber
    {
        private int number;
        public MyNumber(int number)
        {
            this.number = number;
            Console.WriteLine(this.number);
        }
    }
    class CustomerAccount
    {
        public virtual decimal CalculatePrice()
        {
            return 0.0M;
        }
    }
    class GoldAccount : CustomerAccount
    {
        public override decimal CalculatePrice()
        {
            return base.CalculatePrice()*0.9M;
        }
    }
    public interface IBankAccount
    {
        void PayIn(decimal amount);
        bool Withdraw(decimal amount);
        decimal Balance { get; }
    }
    public class SaverAccount : IBankAccount
    {
        private decimal balance;
        public void PayIn(decimal amount)
        {
            balance += amount;
        }
        public bool Withdraw(decimal amount)
        {
            if (balance >= amount)
            {
                balance -= amount;
                return true;
            }
            Console.WriteLine("Withdrawal attempt failed.");
            return false;
        }
        public decimal Balance
        {
            get
            {
                return balance;
            }
        }
        public override string ToString()
        {
            return String.Format("Venus Bank Saver: Balance ={0,6:c}", balance);
        }
    }
    public interface IComparable<in T>
    {
        int CompareTo(T other);
    }
    public class Person : IComparable
    {
        public int CompareTo(object obj)
        {
            int[] myArray = {4,7,11,2};
            int[] myArray2 = (int[])myArray.Clone();
            Array.Sort(myArray);
            int[,] twodim = {{1,2,3},{4,5,6},{7,8,9}};
            return 8;
        }
    }
}
