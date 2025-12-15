using minhlamcons.Models.Database;
using System.Collections.Generic;

namespace minhlamcons.Areas.Mod.ViewModels
{
    public class SiteSettingAddModel:TbSiteSetting
    {
        public List<SiteSettingItem> SiteSettingType { get; set; }
    }
    public class SiteSettingItem
    {
        public int Id { get; set; }
        public string Name { get; set; }

    }
}
