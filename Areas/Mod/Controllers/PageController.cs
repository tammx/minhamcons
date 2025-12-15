using cloudscribe.Pagination.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using minhlamcons.Areas.Mod.ViewModels;
using minhlamcons.Models.Database;
using minhlamcons.Models.ViewModel;
using System;
using System.Collections.Immutable;
using System.Linq;
using System.Text.RegularExpressions;

namespace minhlamcons.Areas.Mod.Controllers
{
    [Area("Mod")]
    [Authorize(Roles = "Admin,Moderator")]
    public class PageController : Controller
    {
        private readonly ILogger<PageController> _logger;
        private readonly SiteDbContext _db;
        public PageController(ILogger<PageController> logger, SiteDbContext db)
        {
            _logger = logger;
            _db = db;
        }
        public IActionResult Index(int? parentid, int pageNumber = 1, int pageSize = 10)
        {
            int excludeRecords = (pageSize * pageNumber) - pageSize;

            //var LstParent = _db.TbPages.Where(x => x.Delete == false && x.ParentId == null).Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            var LstParent = _db.TbPages.FromSqlRaw("select p1.Id, p1.Name from Page p1 inner join Page p2 on p1.Id=p2.ParentId group by p1.Id, p1.Name").Select(x=>new DropdownViewModel { Id = x.Id, Name = x.Name }).ToList();
            LstParent.Insert(0, new DropdownViewModel { Id = 0, Name = "-- Chọn --" });
            ViewBag.LstParent = LstParent;

            PageViewModel data = new PageViewModel();

            var paging = new PagedResult<TbPage>
            {
                //Data = data.LstPage.Skip(excludeRecords).Take(pageSize).ToList(),
                //TotalItems = data.Count(),
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            
            
            if (parentid != null && parentid >0)
            {
                var tmp = _db.TbPages.Where(x => x.Delete == false && x.ParentId == parentid.Value).OrderBy(x => x.ParentId).ThenBy(x => x.Order);
                paging.Data = tmp.Skip(excludeRecords).Take(pageSize).ToList();
                paging.TotalItems = tmp.Count();
                data.ParentId = parentid.Value;
            }
            else
            {
                var tmp = _db.TbPages.Where(x => x.Delete == false && x.ParentId == null).OrderBy(x => x.Order);
                paging.Data = tmp.Skip(excludeRecords).Take(pageSize).ToList();
                paging.TotalItems = tmp.Count();
                data.ParentId = null;
            }
            data.LstPage = paging;
            return View(data);
        }
        [HttpGet]
        public IActionResult AddPage()
        {
            var LstParent = _db.TbPages.Where(x => x.Delete == false && x.ParentId==null).Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            LstParent.Insert(0, new { Id = 0, Name = "-- Chọn --" });
            //var LstParent = _db.TbPages.FromSqlRaw("select p1.Id, p1.Name from Page p1 inner join Page p2 on p1.Id=p2.ParentId group by p1.Id, p1.Name").Select(x => new DropdownViewModel { Id = x.Id, Name = x.Name }).ToList();
            //LstParent.Insert(0, new DropdownViewModel { Id = 0, Name = "-- Chọn --" });
            ViewBag.LstParent = LstParent;
            return View();
        }
        [HttpPost]
        public IActionResult AddPage(TbPage page)
        {
            if (ModelState.IsValid)
            {
                if (page.ParentId == 0) page.ParentId = null;
                page.CreatedBy = User.Identity.Name;
                //page.Url = Regex.Replace(page.Url, "[^a-zA-Z0-9_]+", "-");
                _db.TbPages.Add(page);
                var rs =_db.SaveChanges();
                if(rs>0)
                    return RedirectToAction("Index");
            }
            var LstParent = _db.TbPages.Where(x => x.Delete == false && x.ParentId == null).Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            LstParent.Insert(0, new { Id = 0, Name = "-- Chọn --" });
            ViewBag.LstParent = LstParent;
            return View(page);
        }
        public IActionResult EditPage(int id)
        {
            var LstParent = _db.TbPages.Where(x => x.Delete == false && x.ParentId == null).Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            LstParent.Insert(0, new { Id = 0, Name = "-- Chọn --" });
            ViewBag.LstParent = LstParent;
            var page = _db.TbPages.FirstOrDefault(x => x.Id == id);
            return View(page);
        }
        [HttpPost]
        public IActionResult EditPage(TbPage page)
        {
            if (page != null)
            {
                _db.Entry(page).State = EntityState.Modified;
                if (page.ParentId == 0) page.ParentId = null;
                //page.Url = Regex.Replace(page.Url, "[^a-zA-Z0-9_]+", "-");
                page.UpdatedBy = User.Identity.Name;
                page.UpdatedDate = DateTime.Now;
                
                int rs = _db.SaveChanges();

                if (rs > 0)
                    return RedirectToAction("Index");
            }
            var LstParent = _db.TbPages.Where(x => x.Delete == false && x.ParentId == null).Select(x => new { Id = x.Id, Name = x.Name }).ToList();
            LstParent.Insert(0, new { Id = 0, Name = "-- Chọn --" });
            ViewBag.LstParent = LstParent;
            return View(page);
        }
        public IActionResult DeletePage(int id)
        {
            var model = _db.TbPages.FirstOrDefault(x => x.Id == id && x.Delete != true);
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
    }
}