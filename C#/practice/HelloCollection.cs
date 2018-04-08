using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace practice
{
    public class HelloCollection
    {
        public IEnumerator GetEnumerator()
        {
            return new Enumerator(0);
        }

        public class Enumerator : IEnumerator<string>, IEnumerator, IDisposable
        {
            private int state;
            private string current;

            public Enumerator(int state)
            {
                this.state = state;
            }
            bool System.Collections.IEnumerator.MoveNext()
            {
                switch (state)
                {
                    case 0:
                        current = "Hello";
                        state = 1;
                        return true;
                    case 1:
                        current = "World";
                        state = 2;
                        return true;
                    case 2:
                        break;
                }
                return false;
            }

            void System.Collections.IEnumerator.Reset()
            {
                throw new NotSupportedException();
            }

            string System.Collections.Generic.IEnumerator<string>.Current
            {
                get
                {
                    return current;
                }
            }
            object System.Collections.IEnumerator.Current
            {
                get
                {
                    return current;
                }
            }

            void IDisposable.Dispose()
            { 
            }
        }
    }
}
