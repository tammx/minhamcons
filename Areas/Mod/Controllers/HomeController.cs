using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace minhlamcons.Areas.Mod.Controllers
{
    [Area("Mod")]
    [Authorize(Roles = "Moderator")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}