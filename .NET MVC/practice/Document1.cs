using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace practice
{
    public class Document1
    {
        public string Title { get; private set; }
        public string Content { get; private set; }

        public Document1(string title, string content)
        {
            this.Title = title;
            this.Content = content;
        }
    }

    public class Document1Manager
    {
        private readonly Queue<Document1> document1Queue = new Queue<Document1>();

        public void AddDocument(Document1 doc)
        {
            lock (this)
            {
                document1Queue.Enqueue(doc);
            }
        }
        public Document1 GetDocument()
        {
            Document1 doc = null;
            lock (this)
            {
                doc = document1Queue.Dequeue();
            }
            return doc;
        }

        public bool IsDocumentAvailable
        {
            get
            {
                return document1Queue.Count > 0;
            }
        }
    }
    public class ProcessDocument1s
    {
        public static void Start(Document1Manager dm)
        {
            Task.Factory.StartNew(new ProcessDocument1s(dm).Run);
        }

        protected ProcessDocument1s(Document1Manager dm)
        {
            if (dm == null)
                throw new ArgumentNullException("dm");
            document1Manager = dm;
        }

        private Document1Manager document1Manager;

        protected void Run()
        {
            while (true)
            {
                if (document1Manager.IsDocumentAvailable)
                {
                    Document1 doc = document1Manager.GetDocument();
                }
                Thread.Sleep(new Random().Next(20));
            }
        }
    }
}
