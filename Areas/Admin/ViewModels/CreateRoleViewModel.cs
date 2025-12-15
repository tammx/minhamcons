using System.ComponentModel.DataAnnotations;

namespace minhlamcons.Areas.Admin.ViewModels
{
    public class CreateRoleViewModel
    {
        [Required]
        public string RoleName { get; set; }
        [Required]
        public string RoleDes { get; set; }
    }
}
