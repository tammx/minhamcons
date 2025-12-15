using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace minhlamcons.Models.Database
{
    [Table("News")]
    public class TbNews: SiteBaseTable
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        [Display(Name = "Tiêu đề")]
        public string Name { get; set; }

        [StringLength(500)]
        [Display(Name = "Tóm tắt")]
        public string Des { get; set; }

        [StringLength(500)]
        [Display(Name = "Hình đại diện")]
        public string Image { get; set; }

        [Required]
        [Display(Name = "Nội dung")]
        public string Content { get; set; }

        [Required]
        [Display(Name = "Tin nổi bật")]
        public bool IsHot { get; set; } = false;

        [Required]
        public int PageId { get; set; }
        [ForeignKey("PageId")]
        public virtual TbPage TbPages { get; set; }

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

        [StringLength(255)]
        [Display(Name = "Đường dẫn")]
        public string Url { get; set; }
    }
}
