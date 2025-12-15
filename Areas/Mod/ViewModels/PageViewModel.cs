using cloudscribe.Pagination.Models;
using minhlamcons.Models.Database;
using System;

namespace minhlamcons.Areas.Mod.ViewModels
{
    public class PageViewModel
    {
        public PagedResult<TbPage> LstPage { get; set; }
        public Nullable<int> ParentId { get; set; }
    }
}
