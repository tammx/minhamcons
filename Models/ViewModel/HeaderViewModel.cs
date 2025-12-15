using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace minhlamcons.Models.ViewModel
{
    public class HeaderViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public List<HeaderViewModel> Child { get; set; }
    }
}
