using AutoMapper;
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
        private readonly IMapper _mapper;

        public AccountController(Datacontext datacontext,Itoken itoken,IMapper mapper)
        {
            _datacontext = datacontext;
            _itoken = itoken;
            _mapper = mapper;
        }
        [HttpPost("register")]
        public async Task<ActionResult<userDto>> register(registerDto registerDto)
        {
            if (await ExistsUser(registerDto.username)) return BadRequest("Username Exists");
            var user = _mapper.Map<AppUser>(registerDto);
            using var hmac = new HMACSHA512();
                user.UserName = registerDto.username.ToLower();
                user.passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password));
                user.PasswordSalt = hmac.Key;
            _datacontext.Users.Add(user);
            await _datacontext.SaveChangesAsync();
            return new userDto()
            {
                username = user.UserName,
                Token = _itoken.createToken(user),
                Knownas = user.Knownas
        };

    }
        [HttpPost("login")]
        public async Task<ActionResult<userDto>> login(loginDto loginDto)
        {
            var user = await _datacontext.Users.Include(x => x.Photos).SingleOrDefaultAsync(x => x.UserName == loginDto.username.ToLower());
            if (user == null) return Unauthorized("Invalid user");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));
            for (int i = 0; i < hash.Length; i++)
            {
                if (hash[i] != user.passwordHash[i]) return Unauthorized("Invalid password");
            }
            return new userDto()
            {
                username = user.UserName,
                Token = _itoken.createToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.Ismain)?.Url,
                Knownas = user.Knownas
            };
        }
        private async Task<bool> ExistsUser(string username)
        {
           return await _datacontext.Users.AnyAsync(x => x.UserName == username);
        }
    }
}
