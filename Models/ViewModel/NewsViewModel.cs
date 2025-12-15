using cloudscribe.Pagination.Models;
using minhlamcons.Models.Database;
using System.Collections.Generic;

namespace minhlamcons.Models.ViewModel
{
    public class NewsViewModel
    {
        public string PageSEOTitle { get; set; }
        public string PageSEODes { get; set; }
        public string PageSEOKeyword { get; set; }
        public string PageSEOH1 { get; set; }
        public string PageTitle { get; set; }
        public string PageDes { get; set; }
        public List<TbPage> LstPageChild { get; set; }
        public PagedResult<TbNews> LstNews { get; set; }
    }
}
