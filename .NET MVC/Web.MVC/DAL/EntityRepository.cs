using System;
using System.Linq.Expressions;
using System.Linq;
using System.Data;
using System.Data.Entity;
using Web.Mvc.Model;

namespace Web.Mvc.Dal
{
    public class EntityRepository<T> where T : class
    {
        protected DbSet<T> dbSet;
        protected PPTContext context;

        public EntityRepository(PPTContext c)
        {
            this.context = c;
            this.dbSet = c.Set<T>();
        }

        /// <summary>
        /// 暴露dbSet便于跨表查询和直接执行T-SQL
        /// </summary>
        public DbSet<T> DbSet
        {
            get { return this.dbSet; }
        }

        /// <summary>
        /// 可override的Get方法
        /// </summary>
        /// <param name="pageIndex">页索引，从1开始</param>
        /// <param name="pageSize">每页的项数</param>
        /// <param name="filter">t=>t.id==10</param>
        /// <param name="orderBy">orderBy:q => q.OrderBy(d => d.UpdateDate)</param>
        /// <param name="includeProperties">要包含的导航属性</param>
        /// <returns>便于后续扩展，应返回IQueryable，返回IEnumerable就提前向数据库发送请求了</returns>
        public virtual IQueryable<T> Get(
            int? pageIndex = null,
            int? pageSize = null,
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<T> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (pageIndex != null && pageSize != null)
            {
                return query
                    .Skip(Convert.ToInt32((pageIndex - 1) * pageSize))
                    .Take(Convert.ToInt32(pageSize));
            }
            else { return query; }
        }

        public virtual T GetById(object id)
        {
            return dbSet.Find(id);
        }

        public virtual void Insert(T entity)
        {
            if (!overrideUpdate(entity, true))
            {
                dbSet.Add(entity);
            }
        }

        public virtual void Delete(object id)
        {
            T entityToDelete = dbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(T entityToDelete)
        {
            if (context.Entry(entityToDelete).State == System.Data.Entity.EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
        }

        public virtual void Update(T entityToUpdate)
        {
            if (!overrideUpdate(entityToUpdate, false))
            {
                //System.IO.File.AppendAllText("/apps/data.txt", "默认update处理：\r\n");
                dbSet.Attach(entityToUpdate);
                context.Entry(entityToUpdate).State = System.Data.Entity.EntityState.Modified;
            }
        }

        private bool overrideUpdate(T entityToUpdate,bool isInsert)
        {
            string typeWholeName = entityToUpdate.GetType().ToString();
            string typeName = typeWholeName.IndexOf("Proxies") > -1 ?
                entityToUpdate.GetType().ToString().Substring(
                typeWholeName.IndexOf("Proxies") + 8, typeWholeName.LastIndexOf("_") - typeWholeName.IndexOf("Proxies") - 8
                )
                :
                typeWholeName.Substring(typeWholeName.LastIndexOf(".") + 1);
            //System.IO.File.AppendAllText("/apps/data.txt", "判断中：" + typeName + "----" + typeWholeName + "\r\n");
            if (!isInsert)
            {
                #region 特殊处理Update方法
                switch (typeName)
                {
                    case "PPTItem":
                        PPTItem pptItem = entityToUpdate as Web.Mvc.Model.PPTItem;
                        context.Database.ExecuteSqlCommand(
        @"update PPTItem set classId=@p0,title=@p1,author=@p2,validDate=@p3,description=@p4,pptSrc=@p5,thumbnailSrc=@p6,visible=@p7,updateDate=@p8,updateUser=@p9 where id=@p10",
        pptItem.classId, pptItem.title, pptItem.author, pptItem.validDate, pptItem.description, pptItem.pptSrc, pptItem.thumbnailSrc, pptItem.visible, pptItem.updateDate, pptItem.updateUser, pptItem.id
        );
                        break;
                    default:
                        return false;
                }
                #endregion
                context.Entry(entityToUpdate).State = System.Data.Entity.EntityState.Unchanged;
            }
            else 
            {
                #region 特殊处理Insert方法
                switch (typeName)
                {
                    case "PPTItem":
                        PPTItem entity1 = entityToUpdate as PPTItem;
                        context.Database.ExecuteSqlCommand(
        @"insert into PPTItem(classId,title,author,validDate,description,pptSrc,thumbnailSrc,visible,updateDate,updateUser) values(@p0,@p1,@p2,@p3,@p4,@p5,@p6,@p7,@p8,@p9)",
        entity1.classId, entity1.title, entity1.author, entity1.validDate, entity1.description, entity1.pptSrc, entity1.thumbnailSrc, entity1.visible, entity1.updateDate, entity1.updateUser
        );
                        break;
                    default:
                        return false;
                }
                #endregion
            }
            return true;
        }
    }
}
