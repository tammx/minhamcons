using cloudscribe.Pagination.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using minhlamcons.Areas.Mod.ViewModels;
using minhlamcons.Extensions;
using minhlamcons.Models;
using minhlamcons.Models.Database;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Drawing;
using LazZiya.ImageResize;

namespace minhlamcons.Areas.Mod.Controllers
{
    [Area("Mod")]
    [Authorize(Roles = "Admin,Moderator")]
    public class SiteSettingController : Controller
    {
        private readonly ILogger<PageController> _logger;
        private readonly SiteDbContext _db;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private const int BanerImageWidth = 1920;
        private const int BanerImageHeight = 600;
        public SiteSettingController(ILogger<PageController> logger, SiteDbContext db, IWebHostEnvironment hostingEnvironment)
        {
            _logger = logger;
            _db = db;
            _hostingEnvironment = hostingEnvironment;
        }
        public IActionResult Index(int pageNumber = 1, int pageSize = 10)
        {
            var siteSetting = _db.TbSiteSettings.Where(x => x.Delete == false).AsNoTracking();
            int excludeRecords = (pageSize * pageNumber) - pageSize;

            var result = new PagedResult<TbSiteSetting>
            {
                Data = siteSetting.Skip(excludeRecords).Take(pageSize).ToList(),
                TotalItems = siteSetting.Count(),
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            return View(result);
        }
        [HttpGet]
        public IActionResult AddSiteSetting()
        {
            var currSiteSetting = _db.TbSiteSettings.Where(x => x.Delete != true).Select(x => x.Id);
            var loaiCauHinhs = Enum.GetValues(typeof(SiteSettingCode)).Cast<SiteSettingCode>().Where(x => !currSiteSetting.Contains(x));
            var model = new SiteSettingAddModel
            {
                SiteSettingType = loaiCauHinhs.Select(x => new SiteSettingItem
                {
                    Id = (int)x,
                    Name = x.GetDescription()
                }).ToList(),
            };

            return View(model);
        }
        [HttpPost]
        public IActionResult AddSiteSetting(SiteSettingAddModel data)
        {
            if (ModelState.IsValid)
            {
                _db.TbSiteSettings.Add(new TbSiteSetting
                {
                    Id = data.Id,
                    CreatedBy = User.Identity.Name,
                    Content = data.Content
                });
                int rs = _db.SaveChanges();

                if (rs > 0)
                    return RedirectToAction("Index");

            }
            return View(data);
        }
        [HttpGet]
        public IActionResult EditSiteSetting(int id)
        {
            var rs = _db.TbSiteSettings.FirstOrDefault(x => x.Id == (SiteSettingCode)id);
            ViewBag.LoaiCauHinh = ((SiteSettingCode)id).GetDescription().ToString();
            return View(rs);
        }
        [HttpPost]
        public IActionResult EditSiteSetting(TbSiteSetting model)
        {
            if (ModelState.IsValid)
            {
                _db.Entry(model).State = EntityState.Modified;
                model.UpdatedBy = User.Identity.Name;
                model.UpdatedDate = DateTime.Now;
                _db.Update(model);
                int rs = _db.SaveChanges();
                if (rs > 0)
                    return RedirectToAction("Index");
            }
            return View(model);
        }
        public IActionResult DeleteSiteSetting(int id)
        {
            var model = _db.TbSiteSettings.FirstOrDefault(x => x.Id == (SiteSettingCode)id);
            if (model != null)
            {
                _db.Remove(model);
                int rs = _db.SaveChanges();

                if (rs > 0)
                    return RedirectToAction("Index");
            }

            return View(model);
        }
        #region upload images
        /// <summary>
        /// Upload large image
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult UploadImage(List<IFormFile> files, string loaiCauHinh)
        {
            if (files != null && files.Any())
            {
                try
                {
                    var upload = files.FirstOrDefault();
                    if (upload.Length > 0)
                    {
                        string uploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, "uploads\\sitesetting");
                        string fileName = $"{Guid.NewGuid()}_{upload.FileName}";
                        string filePath = Path.Combine(uploadFolder, fileName);

                        using (var stream = upload.OpenReadStream())
                        {
                            var uploadedImage = Image.FromStream(stream);
                            if (loaiCauHinh == "BANER")
                            {
                                var img = ImageResize.Scale(uploadedImage, BanerImageWidth, BanerImageHeight);
                                img.SaveAs(filePath);
                            }
                            // TODO: Set width and height
                            else
                            {
                                uploadedImage.SaveAs(filePath);
                            }
                        }

                        return Ok(fileName);
                    }
                }
                catch { }
            }

            return Ok();
        }

        [HttpPost]
        public IActionResult DeleteImage(string fileName)
        {
            if (!String.IsNullOrEmpty(fileName))
            {
                string uploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, "uploads\\sitesetting");
                string filePath = Path.Combine(uploadFolder, fileName);
                FileInfo file = new FileInfo(filePath);
                if (file.Exists)
                {
                    file.Delete();
                }

                return Ok(true);
            }

            return Ok(false);
        }
        #endregion
    }
}