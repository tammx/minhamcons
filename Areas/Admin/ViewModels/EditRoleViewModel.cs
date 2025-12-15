using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace minhlamcons.Areas.Admin.ViewModels
{
    public class EditRoleViewModel
    {
        public EditRoleViewModel()
        {
            Users = new List<string>();
        }
        public string Id { get; set; }
        [Required(ErrorMessage = "Bắt buộc nhập")]
        public string RoleName { get; set; }
        [Required(ErrorMessage = "Bắt buộc nhập")]
        public string RoleDes { get; set; }
        public List<string> Users { get; set; }
    }
}
