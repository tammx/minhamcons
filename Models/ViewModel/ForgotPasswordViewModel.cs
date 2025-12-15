using System.ComponentModel.DataAnnotations;

namespace minhlamcons.Models.ViewModel
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
