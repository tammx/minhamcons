using cloudscribe.Pagination.Models;
using LazZiya.ImageResize;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using minhlamcons.Areas.Mod.ViewModels;
using minhlamcons.Extensions;
using minhlamcons.Models.Database;
using System;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace minhlamcons.Areas.Mod.Controllers
{
    [Area("Mod")]
    [Authorize(Roles = "Admin,Moderator")]
    public class NewsController : Controller
    {
        private readonly ILogger<PageController> _logger;
        private readonly SiteDbContext _db;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private const int BanerImageWidth = 1920;
        private const int BanerImageHeight = 600;
        public NewsController(ILogger<PageController> logger, SiteDbContext db, IWebHostEnvironment hostingEnvironment)
        {
            _logger = logger;
            _db = db;
            _hostingEnvironment = hostingEnvironment;
        }
        public IActionResult Index(int? pageid, int pageNumber = 1, int pageSize = 10)
        {
            int excludeRecords = (pageSize * pageNumber) - pageSize;

            //var LstPage = _db.TbPages.Where(x => x.Delete == false && x.PageType != 0).Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            var LstPage = _db.TbPages.FromSqlRaw("select p9.Id,COALESCE(p8.Name+' > ','')+p9.Name Name from [page] p9 left join [page] p8 on p9.ParentId=p8.Id where p9.[Delete]=0 and p9.PageType !=0 and p9.Id not in(select p1.Id from [page] p1 inner join [page] p2 on p1.Id=p2.ParentID group by p1.Id)").Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            LstPage.Insert(0, new { Id = 0, Name = "Tất cả" });
            ViewBag.LstPage = LstPage;

            NewsViewModel data = new NewsViewModel();

            var paging = new PagedResult<TbNews>
            {
                //Data = data.LstPage.Skip(excludeRecords).Take(pageSize).ToList(),
                //TotalItems = data.Count(),
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            if (pageid != null && pageid > 0)
            {
                var tmp = _db.TbNewses.Where(x => x.Delete == false && x.PageId == pageid.Value).OrderByDescending(x => x.CreatedDate);
                paging.Data = tmp.Skip(excludeRecords).Take(pageSize).ToList();
                paging.TotalItems = tmp.Count();
                data.PageId = pageid.Value;
            }
            else
            {
                var tmp = _db.TbNewses.Where(x => x.Delete == false).OrderByDescending(x => x.CreatedDate);
                paging.Data = tmp.Skip(excludeRecords).Take(pageSize).ToList();
                paging.TotalItems = tmp.Count();
                data.PageId = null;
            }
            data.LstNews = paging;
            return View(data);
        }
        [HttpGet]
        public IActionResult AddNews()
        {
            //var LstPage = _db.TbPages.Where(x => x.Delete == false && x.PageType != 0).Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            var LstPage = _db.TbPages.FromSqlRaw("select p9.Id,COALESCE(p8.Name+' > ','')+p9.Name Name from [page] p9 left join [page] p8 on p9.ParentId=p8.Id where p9.[Delete]=0 and p9.PageType !=0 and p9.Id not in(select p1.Id from [page] p1 inner join [page] p2 on p1.Id=p2.ParentID group by p1.Id)").Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            LstPage.Insert(0, new { Id = 0, Name = "-- Chọn --" });
            ViewBag.LstPage = LstPage;
            return View();
        }
        [HttpPost]
        public IActionResult AddNews(AddNewsViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model.Photo != null)
                {
                    string uploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, "uploads\\news");
                    string fileName = Guid.NewGuid().ToString() + "_" + model.Photo.FileName;
                    string filePath = Path.Combine(uploadFolder, fileName);
                    //model.Photo.CopyTo(new FileStream(filePath,FileMode.Create));
                    using (var stream = model.Photo.OpenReadStream())
                    {
                        var uploadedImage = Image.FromStream(stream);
                        Size imgSize = ToolExtensions.NewImageSize(uploadedImage.Height, uploadedImage.Width, 500);
                        var img = ImageResize.Scale(uploadedImage, imgSize.Width, imgSize.Height);

                        img.SaveAs(filePath);
                    }
                    model.NewsDetail.Image = fileName;
                }
                if(String.IsNullOrEmpty(model.NewsDetail.Des))
                    model.NewsDetail.Des = Regex.Replace(model.NewsDetail.Content, "<.*?>", String.Empty).Substring(0,150);
                model.NewsDetail.Url= Regex.Replace(model.NewsDetail.Url, "[^a-zA-Z0-9_]+", "-");
                model.NewsDetail.CreatedBy = User.Identity.Name;
                _db.TbNewses.Add(model.NewsDetail);
                var rs = _db.SaveChanges();
                if (rs > 0)
                    return RedirectToAction("Index");
            }
            //var LstPage = _db.TbPages.Where(x => x.Delete == false && x.PageType != 0).Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            var LstPage = _db.TbPages.FromSqlRaw("select p9.Id,COALESCE(p8.Name+' > ','')+p9.Name Name from [page] p9 left join [page] p8 on p9.ParentId=p8.Id where p9.[Delete]=0 and p9.PageType !=0 and p9.Id not in(select p1.Id from [page] p1 inner join [page] p2 on p1.Id=p2.ParentID group by p1.Id)").Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            LstPage.Insert(0, new { Id = 0, Name = "-- Chọn --" });
            ViewBag.LstPage = LstPage;
            return View(model);
        }
        [HttpGet]
        public IActionResult EditNews(int id)
        {
            //var LstPage = _db.TbPages.Where(x => x.Delete == false && x.PageType != 0).Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            var LstPage = _db.TbPages.FromSqlRaw("select p9.Id,COALESCE(p8.Name+' > ','')+p9.Name Name from [page] p9 left join [page] p8 on p9.ParentId=p8.Id where p9.[Delete]=0 and p9.PageType !=0 and p9.Id not in(select p1.Id from [page] p1 inner join [page] p2 on p1.Id=p2.ParentID group by p1.Id)").Select(x=>new { Id = x.Id, Name = x.Name }).ToList();
            LstPage.Insert(0, new { Id = 0, Name = "-- Chọn --" });
            ViewBag.LstPage = LstPage;

            AddNewsViewModel data = new AddNewsViewModel { NewsDetail = _db.TbNewses.FirstOrDefault(x => x.Id == id) };
            
            return View(data);
        }
        [HttpPost]
        public IActionResult EditNews(AddNewsViewModel model)
        {
            if (ModelState.IsValid)
            {
                _db.Entry(model.NewsDetail).State = EntityState.Modified;
                if (model.Photo != null)
                {
                    string uploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, "uploads\\news");
                    string fileName = Guid.NewGuid().ToString() + "_" + model.Photo.FileName;
                    string filePath = Path.Combine(uploadFolder, fileName);
                    //model.Photo.CopyTo(new FileStream(filePath,FileMode.Create));
                    using (var stream = model.Photo.OpenReadStream())
                    {
                        var uploadedImage = Image.FromStream(stream);
                        Size imgSize = ToolExtensions.NewImageSize(uploadedImage.Height, uploadedImage.Width, 500);
                        var img = ImageResize.Scale(uploadedImage, imgSize.Width, imgSize.Height);

                        img.SaveAs(filePath);
                    }
                    model.NewsDetail.Image = fileName;
                }
                model.NewsDetail.Url = Regex.Replace(model.NewsDetail.Url, "[^a-zA-Z0-9_]+", "-");
                model.NewsDetail.UpdatedBy = User.Identity.Name;
                model.NewsDetail.UpdatedDate = DateTime.Now;
                
                var rs = _db.SaveChanges();
                if (rs > 0)
                    return RedirectToAction("Index");
            }
            //var LstPage = _db.TbPages.Where(x => x.Delete == false && x.PageType != 0).Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            var LstPage = _db.TbPages.FromSqlRaw("select p9.Id,COALESCE(p8.Name+' > ','')+p9.Name Name from [page] p9 left join [page] p8 on p9.ParentId=p8.Id where p9.[Delete]=0 and p9.PageType !=0 and p9.Id not in(select p1.Id from [page] p1 inner join [page] p2 on p1.Id=p2.ParentID group by p1.Id)").Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            LstPage.Insert(0, new { Id = 0, Name = "-- Chọn --" });
            ViewBag.LstPage = LstPage;
            return View(model);
        }
        public IActionResult DeleteNews(int id)
        {
            var model = _db.TbNewses.FirstOrDefault(x => x.Id == id && x.Delete != true);
            if (model != null)
            {
                _db.Entry(model).State = EntityState.Modified;
                model.UpdatedBy = User.Identity.Name;
                model.UpdatedDate = DateTime.Now;
                model.Delete = true;
                int rs = _db.SaveChanges();

                if (rs > 0)
                    return RedirectToAction("Index");
            }

            return View(model);
        }
        [AcceptVerbs("Get", "Post")]
        [AllowAnonymous]
        public IActionResult GenerateUrl(string text)
        {
            var rs = StringProcessingExtenssion.RemoveVietnameseString(text);
            return Json(rs);
        }
    }
}