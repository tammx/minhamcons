using Microsoft.AspNetCore.Http;
using minhlamcons.Models.Database;

namespace minhlamcons.Areas.Mod.ViewModels
{
    public class AddNewsViewModel
    {
        public TbNews NewsDetail { get; set; }
        public IFormFile Photo { get; set; }
    }
}
