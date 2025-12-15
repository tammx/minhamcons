using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace minhlamcons.Models.Database
{
    public class ApplicationUser : IdentityUser
    {

        [MaxLength(255)]
        public string FullName { get; set; }
        [MaxLength(500)]
        public string Address { get; set; }
        public bool Gender { get; set; }
        public Nullable<DateTime> JoinedDate { get; set; }
        public Nullable<DateTime> BOD { get; set; }
        [MaxLength(255)]
        public string Avatar { get; set; }
    }
    public class ApplicationRole : IdentityRole<string>
    {
        [MaxLength(255)]
        public string Description { get; set; }
    }
}
