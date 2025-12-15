using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace minhlamcons.Models.ViewModel
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Họ tên bắt buộc")]
        [MinLength(5, ErrorMessage = "Tên tối thiểu 5 ký tự")]
        [Display(Name = "Họ tên")]
        public string HoTen { get; set; }

        [Required(ErrorMessage = "Email bắt buộc")]
        [EmailAddress(ErrorMessage = "Địa chỉ email không đúng")]
        [Remote(action: "ExistEmail", controller: "Account")]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Số điện thoại")]
        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$", ErrorMessage = "Số điện thoại không đúng")]
        [Remote(action: "ExistMobile", controller: "Account")]
        public string Mobile { get; set; }

        //[Required(ErrorMessage = "Địa chỉ bắt buộc")]
        [Display(Name = "Địa chỉ")]
        public string DiaChi { get; set; }

        [Required(ErrorMessage = "Giới tính bắt buộc")]
        [Display(Name = "Giới tính")]
        public bool GioiTinh { get; set; }

        [Required]
        [Display(Name = "Mật khẩu")]
        [MinLength(5, ErrorMessage = "Mật khẩu ít nhất 5 ký tự")]
        public string Password { get; set; }

        [Display(Name = "Nhập lại mật khẩu")]
        [Compare("Password", ErrorMessage = "Hai mật khẩu chưa khớp nhau")]
        public string ConfirmPassword { get; set; }
        public IList<AuthenticationScheme> ExternalLogins { get; set; }
    }
}
