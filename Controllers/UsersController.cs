using AutoMapper;
using Dating.Data;
using Dating.DTOs;
using Dating.Interfsces;
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
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository repo,IMapper mapper)
        {
 
            _repo = repo;
            _mapper = mapper;
        }

        //public async Task<ActionResult<AppUser>> adduser()
        //{
        //    var user = new AppUser { Id=2, UserName = "Jim" };
        //    _context.Users.Add(user);
        //    await _context.SaveChangesAsync();
        //    return user;
        //}
        public async Task<ActionResult<IEnumerable<MemberDtos>>> GetUsers()
        {
            var users = await _repo.getMembers();
            return Ok(users);
        }
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDtos>> GetUser(string username)
        {
            var user =  await _repo.getMember(username);
            return user;
        }
    }
}
