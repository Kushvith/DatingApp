using Dating.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Dating.Data
{
    public class seed
    {

        public static async Task Seed(Datacontext context)
        {
            if (await context.Users.AnyAsync()) return;
            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            foreach(var user in users)
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("kushvith"));
                user.PasswordSalt = hmac.Key;
                context.Users.Add(user);            
            }
            await context.SaveChangesAsync();
        }
    }
}
