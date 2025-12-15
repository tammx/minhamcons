using cloudscribe.Pagination.Models;
using minhlamcons.Models.Database;
using System.Collections.Generic;

namespace minhlamcons.Models.ViewModel
{
    public class NewsDetailViewModel
    {
        public List<TbNews> HotNews { get; set; }
        public List<PageWithNews> PageWithNews { get; set; }
        public TbNews News { get; set; }
    }
    public class PageWithNews
    { 
        public string PageTitle { get; set; }
        public List<TbNews> LstNews { get; set; }
    }
}
