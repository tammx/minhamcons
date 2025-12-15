using System.ComponentModel.DataAnnotations;

namespace minhlamcons.Models.ViewModel
{
    public class ShowPageViewModel
    {
        public PageType PageType { get; set; }
        public bool Article { get; set; }
        public dynamic Data { get; set; }
    }
}
