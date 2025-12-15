using minhlamcons.Models;
using System.Collections.Generic;

namespace minhlamcons.Services
{
    public interface ISiteSettingService
    {
        Dictionary<SiteSettingCode, string> GetSiteSetting();

        List<string> GetBannerImage();
    }
}
