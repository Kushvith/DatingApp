using Dating.Data;
using Dating.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dating.Controllers
{
   [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly Datacontext _context;

        public UsersController(Datacontext context)
        {
            _context = context;
        }

        //public async Task<ActionResult<AppUser>> adduser()
        //{
        //    var user = new AppUser { Id=2, UserName = "Jim" };
        //    _context.Users.Add(user);
        //    await _context.SaveChangesAsync();
        //    return user;
        //}
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}
