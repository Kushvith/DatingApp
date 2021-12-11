using Dating.Data;
using Dating.DTOs;
using Dating.Interfsces;
using Dating.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Dating.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly Datacontext _datacontext;
        private readonly Itoken _itoken;

        public AccountController(Datacontext datacontext,Itoken itoken)
        {
            _datacontext = datacontext;
            _itoken = itoken;
        }
        [HttpPost("register")]
        public async Task<ActionResult<userDto>> register(registerDto registerDto)
        {
            if (await ExistsUser(registerDto.username)) return BadRequest("Username Exists");
            using var hmac = new HMACSHA512();
            var user = new AppUser()
            {
                UserName = registerDto.username.ToLower(),
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
                PasswordSalt = hmac.Key,

            };
            _datacontext.Users.Add(user);
            await _datacontext.SaveChangesAsync();
            return new userDto()
            {
                username = user.UserName,
                Token = _itoken.createToken(user)
        };

    }
        [HttpPost("login")]
        public async Task<ActionResult<userDto>> login(loginDto loginDto)
        {
            var user = await _datacontext.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.username.ToLower());
            if (user == null) return Unauthorized("Invalid user");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));
            for(int i =0; i< hash.Length; i++)
            {
                if (hash[i] != user.passwordHash[i]) return Unauthorized("Invalid password");
            }
        return new userDto()
        {
            username = user.UserName,
            Token = _itoken.createToken(user)
    };
}
        private async Task<bool> ExistsUser(string username)
        {
           return await _datacontext.Users.AnyAsync(x => x.UserName == username);
        }
    }
}
