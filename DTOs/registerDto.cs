﻿using System;
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
        public string  password { get; set; }
    }
}
