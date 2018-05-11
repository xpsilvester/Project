namespace Web.Mvc.Model
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class PPTContext : DbContext
    {
        public PPTContext()
            : base("name=PPTContext")
        {
        }

        static PPTContext()
        {
            Database.SetInitializer<PPTContext>(null);
        }

        public DbSet<PPTClass> PPTClasses { get; set; }
        public DbSet<PPTItem> PPTItems { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PPTClass>()
                .Property(e => e.className)
                .IsUnicode(false);

            modelBuilder.Entity<PPTClass>()
                .Property(e => e.classTip)
                .IsUnicode(false);

            modelBuilder.Entity<PPTClass>()
                .HasMany(e => e.PPTItems)
                .WithRequired(e => e.PPTClass)
                .HasForeignKey(e => e.classId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<PPTItem>()
                .Property(e => e.title)
                .IsUnicode(false);

            modelBuilder.Entity<PPTItem>()
                .Property(e => e.author)
                .IsUnicode(false);

            modelBuilder.Entity<PPTItem>()
                .Property(e => e.description)
                .IsUnicode(false);

            modelBuilder.Entity<PPTItem>()
                .Property(e => e.pptSrc)
                .IsUnicode(false);

            modelBuilder.Entity<PPTItem>()
                .Property(e => e.thumbnailSrc)
                .IsUnicode(false);

            modelBuilder.Entity<PPTItem>()
                .Property(e => e.updateUser)
                .IsUnicode(false);
        }
    }
}
