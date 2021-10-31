using Dating.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dating.Interfsces
{
   public interface Itoken
    {
       string createToken(AppUser user);
    }
}
