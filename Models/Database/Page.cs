using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace minhlamcons.Models.Database
{
    [Table("Page")]
    public class TbPage: SiteBaseTable
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        [Display(Name = "Tên trang")]
        public string Name { get; set; }
        
        [StringLength(255)]
        [Display(Name = "Đường dẫn")]
        public string Url { get; set; }
        [Display(Name = "Trang cha")]
        public Nullable<int> ParentId { get; set; }
        [Display(Name = "Thứ tự")]
        public Nullable<int> Order { get; set; }
        
        [Display(Name = "Loại trình bày")]
        public PageType PageType { get; set; }
        
        [StringLength(500)]
        [Display(Name = "Mô tả")]
        public string Des { get; set; }

        [Display(Name = "Hiển thị ở trang chủ")]
        public int? ShowHomePage { get; set; }

        [Required]
        [Display(Name = "Dạng sidebar")]
        public bool IsSidebar { get; set; } = false;

        [Required]
        [Display(Name = "SEO: Thẻ Title")]
        [MaxLength(255)]
        public string SEOTitle { get; set; } = String.Empty;
        
        [Required]
        [Display(Name = "SEO: Thẻ Description")]
        [MaxLength(500)]
        public string SEODescription { get; set; } = String.Empty;
        
        [MaxLength(255)]
        [Display(Name = "SEO: Thẻ Keyword")]
        public string SEOKeyword { get; set; } = String.Empty;
        
        [Required]
        [Display(Name = "SEO: Thẻ H1")]
        [StringLength(500)]
        public string H1Tag { get; set; } = String.Empty;
    }
}
