using System;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using minhlamcons.Models.Database;
using minhlamcons.Models.ViewModel;

namespace minhlamcons.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        public RoleManager<ApplicationRole> roleManager { get; }

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<ApplicationRole> roleManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
        }
        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Redirect("/");
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Register()
        {
            RegisterViewModel model = new RegisterViewModel
            {
                ExternalLogins = (await signInManager.GetExternalAuthenticationSchemesAsync()).ToList()
            };
            return View(model);
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            model.ExternalLogins = (await signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Mobile, Email = model.Email, PhoneNumber = model.Mobile, FullName = model.HoTen, Address = model.DiaChi, Gender = model.GioiTinh, JoinedDate = DateTime.Now };
                var result = await userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    var role = await roleManager.FindByNameAsync("Moderator");
                    if (role != null)
                        await userManager.AddToRoleAsync(user, role.Name);
                    await signInManager.SignInAsync(user, isPersistent: false);
                    return Redirect("/Mod");
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }
            return View(model);
        }
        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPassword()
        {
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                if (user != null && await userManager.IsEmailConfirmedAsync(user))
                {
                    //tạo mật khẩu ngẫu nhiên và gửi tới email đã đăng ký
                    return View("ForgotPasswordConfirmation");
                }
                return View("ForgotPasswordConfirmation");
            }
            return View(model);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string returnUrl)
        {
            LoginViewModel model = new LoginViewModel
            {
                ReturnUrl = WebUtility.UrlDecode(returnUrl),
                ExternalLogins = (await signInManager.GetExternalAuthenticationSchemesAsync()).ToList()
            };
            return View(model);
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl)
        {
            model.ExternalLogins = (await signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            if (ModelState.IsValid)
            {
                var result = await signInManager.PasswordSignInAsync(model.Mobile, model.Password, model.RememberMe, false);
                if (result.Succeeded)
                {
                    if (!String.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl) && returnUrl != "/")
                        return Redirect(returnUrl);
                    return RedirectToAction("ObeyMyOrder");
                }
                ModelState.AddModelError("", "Đăng nhập thất bại");
            }
            return View(model);
        }
        [AllowAnonymous]
        [HttpGet]
        public IActionResult ExternalLogin(string provider, string returnUrl)
        {
            var redirectUrl = Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl });
            var properties = signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return new ChallengeResult(provider, properties);
        }
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");
            LoginViewModel loginViewModel = new LoginViewModel
            {
                ReturnUrl = returnUrl,
                ExternalLogins = (await signInManager.GetExternalAuthenticationSchemesAsync()).ToList()
            };
            if (remoteError != null)
            {
                ModelState.AddModelError(string.Empty, "Error loading external login information");
                return View("Login", loginViewModel);
            }
            var info = await signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                ModelState.AddModelError(string.Empty, $"Error from external provider: {remoteError}");
                return View("Login", loginViewModel);
            }
            var signInResult = await signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
            if (signInResult.Succeeded)
            {
                if (!String.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl) && returnUrl != "/")
                    return Redirect(returnUrl);
                return RedirectToAction("ObeyMyOrder");
            }
            else
            {

                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                var mobile = info.Principal.FindFirstValue(ClaimTypes.MobilePhone);
                if (email != null)
                {
                    var user = await userManager.FindByEmailAsync(email);
                    if (user == null)
                    {
                        user = new ApplicationUser
                        {
                            UserName = info.Principal.FindFirstValue(ClaimTypes.Email),
                            Email = info.Principal.FindFirstValue(ClaimTypes.Email)
                        };
                        await userManager.CreateAsync(user);
                    }
                    var role = await roleManager.FindByNameAsync("Moderator");
                    if (role != null)
                        await userManager.AddToRoleAsync(user, role.Name);
                    await userManager.AddLoginAsync(user, info);
                    await signInManager.SignInAsync(user, isPersistent: false);

                    if (!String.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl) && returnUrl != "/")
                        return Redirect(returnUrl);
                    return RedirectToAction("ObeyMyOrder");
                }
                else if (mobile != null)
                {
                    var user = await userManager.FindByNameAsync(mobile);
                    if (user == null)
                    {
                        user = new ApplicationUser
                        {
                            UserName = info.Principal.FindFirstValue(ClaimTypes.MobilePhone),
                            PhoneNumber = info.Principal.FindFirstValue(ClaimTypes.MobilePhone)
                        };
                        await userManager.CreateAsync(user);
                    }
                    var role = await roleManager.FindByNameAsync("Moderator");
                    if (role != null)
                        await userManager.AddToRoleAsync(user, role.Name);
                    await userManager.AddLoginAsync(user, info);
                    await signInManager.SignInAsync(user, isPersistent: false);

                    if (!String.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl) && returnUrl != "/")
                        return Redirect(returnUrl);
                    return RedirectToAction("ObeyMyOrder");
                }
                else
                {
                    var userid = info.Principal.FindFirstValue(ClaimTypes.NameIdentifier);
                    var user = await userManager.FindByNameAsync(userid);
                    if (user == null)
                    {
                        user = new ApplicationUser
                        {
                            UserName = info.Principal.FindFirstValue(ClaimTypes.NameIdentifier)
                        };
                        await userManager.CreateAsync(user);
                    }
                    var role = await roleManager.FindByNameAsync("Moderator");
                    if (role != null)
                        await userManager.AddToRoleAsync(user, role.Name);
                    await userManager.AddLoginAsync(user, info);
                    await signInManager.SignInAsync(user, isPersistent: false);

                    if (!String.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl) && returnUrl != "/")
                        return Redirect(returnUrl);
                    return RedirectToAction("ObeyMyOrder");
                }

                ViewBag.ErrorTitle = $"Email claim not received from {info.LoginProvider}";
                ViewBag.ErrorMessage = "Please contact support on admin@xetot.com";
                return View("Error");
            }
        }
        public async Task<IActionResult> ObeyMyOrder()
        {
            var currUser = await signInManager.UserManager.FindByNameAsync(User.Identity.Name);
            if (currUser.PhoneNumber == null)
                return Redirect("/Mod/Home/EditProfile");
            if (User.IsInRole("Admin"))
            {
                return Redirect("/admin");
            }
            if (User.IsInRole("Moderator"))
            {
                return Redirect("/Mod");
            }
            return RedirectToAction("index", "home");
        }
        [AcceptVerbs("Get", "Post")]
        [AllowAnonymous]
        public async Task<IActionResult> ExistMobile(string mobile)
        {
            var user = await userManager.FindByNameAsync(mobile);
            if (user == null)
            {
                return Json(true);
            }
            return Json($"Số điện thoại {mobile} đã có trong hệ thống");
        }
        [AcceptVerbs("Get", "Post")]
        [AllowAnonymous]
        public async Task<IActionResult> ExistEmail(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return Json(true);
            }
            return Json($"Địa chỉ mail {email} đã có trong hệ thống");
        }
    }
}