using minhlamcons.Models.ViewModel;
using System.Collections.Generic;

namespace minhlamcons.Services
{
    public interface IPartialService
    {
        List<HeaderViewModel> GetHeader();
        //FooterViewModel GetFooter();
        SliderViewModel GetSlider();
    }
}
