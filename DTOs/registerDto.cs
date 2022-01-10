using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dating.DTOs
{
    public class registerDto
    {
        [Required]
        public string username { get; set; }
        [Required]
        [MinLength(8)]
        public string  password { get; set; }
        [Required] public string Knownas { get; set; }
        [Required] public string Gender { get; set; }
        [Required] public string city { get; set; }
        [Required] public string country { get; set; }
        [Required] public DateTime DateOfBirth { get; set; }


    }
}
