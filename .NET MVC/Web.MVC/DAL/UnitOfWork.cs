using System;
using Web.Mvc.Dal;
using Web.Mvc.Model;

namespace Web.Mvc.DAL
{
    public class UnitOfWork : IDisposable
    {
        private bool _disposed;
        private readonly PPTContext _context;

        public UnitOfWork(PPTContext c)
        {
            _context = c;
        }

        public UnitOfWork()
        {
            _context = new PPTContext();
        }

        #region IDisposable 成员

        public void Dispose()
        {
            Dispose(true);
            //GC.SuppressFinalize(this);
        }

        #endregion

        public void Save()
        {
            _context.SaveChanges();
        }

        /// <summary>
        ///     打开/关闭懒惰加载
        /// </summary>
        /// <param name="open">true:打开懒惰加载，false:反之</param>
        public void SwitchLazyLoad(bool open)
        {
            _context.Configuration.LazyLoadingEnabled = open;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }
        private PPTClassRepository _PPTClassRepository;

        public PPTClassRepository PPTClassRepository
        {
            get { return _PPTClassRepository ?? (_PPTClassRepository = new PPTClassRepository(_context)); }
        }

        private EntityRepository<PPTClass> _PPTClassListRepository;

        public EntityRepository<PPTClass> PPTClassListRepository
        {
            get
            {
                return _PPTClassListRepository ??
                       (_PPTClassListRepository = new EntityRepository<PPTClass>(_context));
            }
        }
        private PPTItemRepository _PPTItemRepository;

        public PPTItemRepository PPTItemRepository
        {
            get
            {
                return _PPTItemRepository ?? (_PPTItemRepository = new PPTItemRepository(_context));
            }
        }
    }
}