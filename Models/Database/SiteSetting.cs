using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace minhlamcons.Models.Database
{
    [Table("SiteSetting")]
    public class TbSiteSetting : SiteBaseTable
    {
        [Key]
        public SiteSettingCode Id { get; set; }
        [Required]
        public string Content { get; set; }
    }
}
