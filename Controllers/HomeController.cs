using cloudscribe.Pagination.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using minhlamcons.Models;
using minhlamcons.Models.Database;
using minhlamcons.Models.ViewModel;
using minhlamcons.Services;
using System.Collections.Generic;
using System.Linq;

namespace minhlamcons.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly SiteDbContext _db;

        public HomeController(ILogger<HomeController> logger, SiteDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        public IActionResult Index()
        {
            HomeViewModel data = new HomeViewModel();
            TbPage p = _db.TbPages.FirstOrDefault(x=>x.Url.Equals("/"));
            if (p != null) {
                data.SEOTitle = p.SEOTitle;
                data.SEODescription = p.SEODescription;
                data.SEOKeyword = p.SEOKeyword;
                data.H1Tag = p.H1Tag;
            }
            List<TbPage> lstPageShowHome = _db.TbPages.Where(x => x.Delete == false && x.ShowHomePage != null).OrderBy(x=>x.ShowHomePage).ToList();
            if (lstPageShowHome.Count ==2 ) {
                //LST1
                List<TbNews> lstNews = _db.TbNewses.Where(x => x.PageId == lstPageShowHome[0].Id && x.Delete == false).OrderByDescending(x => x.CreatedDate).Take(10).ToList();
                if (lstNews.Count <= 0) {
                    var lstPageChild = _db.TbPages.Where(x => x.ParentId == lstPageShowHome[0].Id).ToList();
                    lstNews = _db.TbNewses.FromSqlRaw("select top 10 * from News where PageId in(select Id from Page where ParentId=" + lstPageShowHome[0].Id + ") and [Delete]=0 order by CreatedDate desc").ToList();
                }
                data.LST1 = new ListHomeNews
                {
                    Title = lstPageShowHome[0].Name,
                    Des = lstPageShowHome[0].Des,
                    News = lstNews
                };
                //
                //LST2
                lstNews = _db.TbNewses.Where(x => x.PageId == lstPageShowHome[1].Id && x.Delete == false).OrderByDescending(x => x.CreatedDate).Take(4).ToList();
                if (lstNews.Count <= 0)
                {
                    var lstPageChild = _db.TbPages.Where(x => x.ParentId == lstPageShowHome[1].Id).ToList();
                    lstNews = _db.TbNewses.FromSqlRaw("select top 4 * from News where PageId in(select Id from Page where ParentId=" + lstPageShowHome[1].Id + ") and [Delete]=0 order by CreatedDate desc").ToList();
                }
                data.LST2 = new ListHomeNews
                {
                    Title = lstPageShowHome[1].Name,
                    Des = lstPageShowHome[1].Des,
                    News = lstNews
                };
            }

            ISiteSettingService siteSettingService = new SiteSettingService(_db);
            var siteSettingValue = siteSettingService.GetSiteSetting();

            data.HOME_B1 = siteSettingValue.ContainsKey(minhlamcons.Models.SiteSettingCode.HOME_B1) ? siteSettingValue[minhlamcons.Models.SiteSettingCode.HOME_B1] : "";
            data.HOME_B2 = siteSettingValue.ContainsKey(minhlamcons.Models.SiteSettingCode.HOME_B2) ? siteSettingValue[minhlamcons.Models.SiteSettingCode.HOME_B2] : "";
            data.HOME_B3 = siteSettingValue.ContainsKey(minhlamcons.Models.SiteSettingCode.HOME_B3) ? siteSettingValue[minhlamcons.Models.SiteSettingCode.HOME_B3] : "";
            data.HOME_B4 = siteSettingValue.ContainsKey(minhlamcons.Models.SiteSettingCode.HOME_B4) ? siteSettingValue[minhlamcons.Models.SiteSettingCode.HOME_B4] : "";
            data.MAP = siteSettingValue.ContainsKey(minhlamcons.Models.SiteSettingCode.MAP) ? siteSettingValue[minhlamcons.Models.SiteSettingCode.MAP] : "";
            return View(data);
        }

        public IActionResult GioiThieu()
        {
            return View();
        }
        [HttpGet]
        [AllowAnonymous]
        public IActionResult AccessDenied()
        {
            return View();
        }
        [Route("about-us")]
        public IActionResult AboutUs()
        {
            return View();
        }
        [Route("testnhan-su")]
        public IActionResult NhanSu()
        {
            return View();
        }
        [Route("error")]
        public IActionResult Error(int? statusCode = null)
        {
            if (statusCode == 404)
            {
                ViewBag.Title = "MinhLamCons - Không tìm thấy trang";
                ViewBag.ErrorMessage = "Không tìm thấy trang!";
            }
            else if (statusCode == 401)
            {
                ViewBag.Title = "MinhLamCons - Không có quyền truy cập";
                ViewBag.ErrorMessage = "Bạn không có quyền truy cập!";
            }
            else
            {
                statusCode = 500;
                ViewBag.Title = "MinhLamCons - Xảy ra lỗi";
                ViewBag.ErrorMessage = "Xảy ra lỗi!";
            }

            ViewBag.ErrorCode = statusCode;

            return View("Error");
        }

        [HttpPost]
        public JsonResult Search(string Prefix)
        {
            List<SearchItem> rs = _db.TbNewses.Where(x => x.Name.Contains(Prefix)).Select(x => new SearchItem { Name = x.Name, Url = x.Url }).ToList();
            return Json(rs);
        }
        [HttpGet]
        [Route("{url}")]
        public IActionResult ShowPage(string url, int? pageid, int pageNumber = 1, int pageSize = 9)
        {
            int excludeRecords = (pageSize * pageNumber) - pageSize;
            var p =_db.TbPages.FirstOrDefault(x => x.Delete==false && x.Url.Equals(url));
            if (p != null)
            {
                TbPage pageChild = _db.TbPages.FirstOrDefault(x => x.ParentId == p.Id);
                if (pageChild != null) return Redirect(pageChild.Url);
                List<TbNews> lstNews = _db.TbNewses.Where(x => x.PageId == p.Id && x.Delete==false).OrderByDescending(x=>x.CreatedDate).ToList();
                if (lstNews.Count == 1 && p.PageType == PageType.MinhLam_TinMacDinh)
                { 
                    return View(new ShowPageViewModel { PageType = p.PageType, Article = true, Data = lstNews.FirstOrDefault() }); 
                }
                else if (lstNews.Count >= 1)
                {
                    var lstPageChild = _db.TbPages.Where(x => x.ParentId == p.Id).ToList();
                    if (p.IsSidebar == true)
                    {
                        lstPageChild = _db.TbPages.Where(x => x.ParentId == p.Id).ToList();
                        if (lstPageChild.Count == 0 && p.ParentId != null)
                        {
                            var parent = _db.TbPages.FirstOrDefault(x => x.Id == p.ParentId);
                            lstPageChild = _db.TbPages.Where(x => x.ParentId == parent.Id).ToList();
                        }
                    }
                    var paging = new PagedResult<TbNews>
                    {
                        Data = lstNews.Skip(excludeRecords).Take(pageSize).ToList(),
                        TotalItems = lstNews.Count(),
                        PageNumber = pageNumber,
                        PageSize = pageSize
                    };
                    NewsViewModel data = new NewsViewModel
                    {
                        LstNews = paging,
                        PageTitle = p.Name,
                        PageDes = p.Des,
                        LstPageChild = lstPageChild,
                        PageSEOTitle = p.SEOTitle,
                        PageSEODes = p.SEODescription,
                        PageSEOKeyword = p.SEOKeyword,
                        PageSEOH1 = p.H1Tag
                    };
                    return View(new ShowPageViewModel { PageType = p.PageType, Article = false, Data = data });
                }
                else
                {
                    var lstPageChild = _db.TbPages.Where(x => x.ParentId == p.Id).ToList();
                    lstNews = _db.TbNewses.FromSqlRaw("select * from News where PageId in(select Id from Page where ParentId=" + p.Id + ") and [Delete]=0 order by CreatedDate desc").ToList();

                    var paging = new PagedResult<TbNews>
                    {
                        Data = lstNews.Skip(excludeRecords).Take(pageSize).ToList(),
                        TotalItems = lstNews.Count(),
                        PageNumber = pageNumber,
                        PageSize = pageSize
                    };
                    if (p.IsSidebar == true)
                    {
                        var parent = _db.TbPages.FirstOrDefault(x => x.Id == p.ParentId);
                        lstPageChild = _db.TbPages.Where(x => x.ParentId == parent.Id).ToList();
                    }
                    
                    NewsViewModel data = new NewsViewModel
                    {
                        LstNews = paging,
                        PageTitle = p.Name,
                        PageDes = p.Des,
                        LstPageChild = lstPageChild,
                        PageSEOTitle = p.SEOTitle,
                        PageSEODes = p.SEODescription,
                        PageSEOKeyword = p.SEOKeyword,
                        PageSEOH1 = p.H1Tag
                    };
                    return View(new ShowPageViewModel { PageType = p.PageType, Article = false, Data = data });
                }
            }
            else
            {
                var n = _db.TbNewses.FirstOrDefault(x => x.Delete == false && x.Url.Equals(url));
                if (n != null)
                {

                    p = _db.TbPages.FirstOrDefault(x => x.Delete == false && x.Id==n.PageId);

                    if(p.PageType == PageType.MinhLam_TuyenDung) return View(new ShowPageViewModel { PageType = p.PageType, Article = true, Data = n });
                    
                    List<PageWithNews> lstPwN = new List<PageWithNews>();
                    var lstPage = _db.TbPages.FromSqlRaw("select * from Page where ParentId=(select ParentId from Page where Id="+p.Id+") and [Delete]=0").ToList();
                    foreach (var item in lstPage)
                    {
                        lstPwN.Add(new PageWithNews { 
                            PageTitle = item.Name,
                            LstNews = _db.TbNewses.Where(x=>x.PageId==item.Id && x.Delete==false).OrderByDescending(x=>x.CreatedDate).Take(5).ToList()
                        });
                    }
                    NewsDetailViewModel data = new NewsDetailViewModel
                    {
                        News = n,
                        HotNews = _db.TbNewses.Where(x=>x.PageId==n.PageId && x.IsHot ==true && x.Delete==false).ToList(),
                        PageWithNews = lstPwN
                    };
                    return View(new ShowPageViewModel { PageType = p.PageType, Article = true, Data = data });
                }
            }
            return View(null);
        }
    }
}
