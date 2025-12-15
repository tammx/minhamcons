using System;
using System.Drawing;
using System.IO;
using System.Linq;
using LazZiya.ImageResize;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using minhlamcons.Extensions;

namespace minhlamcons.Controllers
{
    [AllowAnonymous]
    [Route("CKEditorUpload")]
    public class CKEditorUploadController : Controller
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public CKEditorUploadController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [Route("UploadImage/{path}")]
        [HttpPost]
        public IActionResult Upload(IFormFile upload, string path)
        {
            var filename = DateTime.Now.ToString("yyyyMMddHHmmss") + upload.FileName;
            var newpath = Path.Combine(_hostingEnvironment.WebRootPath, $"uploads\\{path}\\", filename);
            //var stream = new FileStream(newpath, FileMode.Create);
            //upload.CopyToAsync(stream);
            using (var stream = upload.OpenReadStream())
            {
                var uploadedImage = Image.FromStream(stream);
                Size imgSize = ToolExtensions.NewImageSize(uploadedImage.Height, uploadedImage.Width, 1500);
                var img = ImageResize.Scale(uploadedImage, imgSize.Width, imgSize.Height);

                img.SaveAs(newpath);
            }
            return new JsonResult(new
            {
                uploaded = 1,
                fileName = upload.FileName,
                url = $"/uploads/{path}/" + filename
            });
        }

        [Route("GetImage/{path}")]
        public ActionResult GetImagesOnServer(string path)
        {
            string uploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, $"uploads\\{path}");
            var images = Directory.GetFiles(uploadFolder).Select(x => Url.Content($"/uploads/{path}/" + Path.GetFileName(x)));
            return View("LoadImage", images);
        }
        [HttpPost]
        [Route("Delete")]
        public ActionResult Delete(string path)
        {
            string fullpath = _hostingEnvironment.WebRootPath + path.Replace("/", "\\");
            if (System.IO.File.Exists(fullpath))
            {
                System.IO.File.Delete(fullpath);
            }
            return Redirect("/CKEditorUpload/GetImage/ckeditor?CKEditor=NewsDetail_Content&CKEditorFuncNum=1&langCode=en-gb");
        }
    }
}