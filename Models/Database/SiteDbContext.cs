using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace minhlamcons.Models.Database
{
    public class SiteDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public SiteDbContext(DbContextOptions<SiteDbContext> options) : base(options)
        {

        }
        public DbSet<TbPage> TbPages { get; set; }
        public DbSet<TbSiteSetting> TbSiteSettings { get; set; }
        public DbSet<TbNews> TbNewses { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            //builder.Entity<Tag_DanhMucChiTiet>()
            //    .HasKey(c => new { c.TagId, c.DanhMucChiTietId });
            base.OnModelCreating(builder);
        }
    }
    
}
