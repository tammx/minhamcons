using Microsoft.AspNetCore.Hosting;
using System;
using System.Drawing;
using System.IO;

namespace minhlamcons.Extensions
{
    public static class ToolExtensions
    {
        //public static string GetImage(this IWebHostEnvironment hostingEnvironment, object src)
        //{
        //    if (src != null)
        //    {
        //        string uploadFolder = Path.Combine(hostingEnvironment.WebRootPath, "uploads");
        //        if (File.Exists(Path.Combine(uploadFolder, src.ToString())))
        //        {
        //            return "/uploads/"+src.ToString();
        //        }
        //    }
        //    return "/assets/images/default.png";
        //}
        public static Size NewImageSize(int OriginalHeight, int OriginalWidth, double thumbSize)
        {
            Size NewSize;
            double tempval;
            //if (OriginalHeight < thumbSize && OriginalWidth > thumbSize)
            if (OriginalWidth > thumbSize || OriginalHeight > thumbSize)
            {
                if (OriginalHeight > OriginalWidth)
                    tempval = thumbSize / Convert.ToDouble(OriginalHeight);
                else
                    tempval = thumbSize / Convert.ToDouble(OriginalWidth);

                NewSize = new Size(Convert.ToInt32(tempval * OriginalWidth), Convert.ToInt32(tempval * OriginalHeight));
            }
            else
                NewSize = new Size(OriginalWidth, OriginalHeight); return NewSize;
        }
    }
}
