using System;
using System.ComponentModel.DataAnnotations;

namespace minhlamcons.Models.Database
{
    public class SiteBaseTable
    {
        [StringLength(256)]
        public string CreatedBy { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [StringLength(256)]
        public string UpdatedBy { get; set; }

        public Nullable<DateTime> UpdatedDate { get; set; }
        [Required]
        public bool Delete { get; set; } = false;
    }
}
