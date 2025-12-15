using cloudscribe.Pagination.Models;
using minhlamcons.Models.Database;
using System;

namespace minhlamcons.Areas.Mod.ViewModels
{
    public class NewsViewModel
    {
        public PagedResult<TbNews> LstNews { get; set; }
        public Nullable<int> PageId { get; set; }
    }
}
