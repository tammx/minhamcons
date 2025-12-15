using minhlamcons.Models.Database;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace minhlamcons.Models.ViewModel
{
    public class HomeViewModel
    {
        
        public string HOME_B1 { get; set; }
        public string HOME_B2 { get; set; }
        public string HOME_B3 { get; set; }
        public string HOME_B4 { get; set; }
        public string MAP { get; set; }
        public string SEOTitle { get; set; }
        public string SEODescription { get; set; }
        public string SEOKeyword { get; set; }
        public string H1Tag { get; set; }
        public ListHomeNews LST1 { get; set; }
        public ListHomeNews LST2 { get; set; }
    }
    public class ListHomeNews
    { 
        public string Title { get; set; }
        public string Des { get; set; }
        public List<TbNews> News { get; set; }
    }
    public class SearchItem
    {
        public string Name { get; set; }
        public string Url { get; set; }
    }
}
