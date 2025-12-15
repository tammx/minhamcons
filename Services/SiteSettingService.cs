using minhlamcons.Models;
using minhlamcons.Models.Database;
using System.Collections.Generic;
using System.Linq;

namespace minhlamcons.Services
{
    public class SiteSettingService : ISiteSettingService
    {
        private readonly SiteDbContext _db;
        public SiteSettingService(SiteDbContext db)
        {
            _db = db;
        }

        public Dictionary<SiteSettingCode, string> GetSiteSetting()
        => _db.TbSiteSettings.Where(x => !x.Delete).ToDictionary(x => x.Id, y => y.Content);

        public List<string> GetBannerImage()
        {
            var slider = _db.TbSiteSettings.FirstOrDefault(x => !x.Delete && x.Id == SiteSettingCode.SLIDER);
            return slider != null && !string.IsNullOrEmpty(slider.Content) ? slider.Content.Split(",").ToList() : null;
        }
    }
}
