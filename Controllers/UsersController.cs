using AutoMapper;
using Dating.Data;
using Dating.DTOs;
using Dating.Helpers;
using Dating.Interfsces;
using Dating.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Dating.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        private readonly IPhoto _photo;

        public UsersController(IUserRepository repo,IMapper mapper,IPhoto photo)
        {
 
            _repo = repo;
            _mapper = mapper;
            _photo = photo;
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
        [HttpGet("{username}",Name ="GetUser")]
        public async Task<ActionResult<MemberDtos>> GetUser(string username)
        {
            var user =  await _repo.getMember(username);
            return user;
        }
        [HttpPut]
        public async Task<ActionResult> update(MemberEditDto memberEditDto)
        {
            var username = User.getuser();
            var user = await _repo.GetUserByUserNameAsync(username);
            _mapper.Map(memberEditDto, user);
            if (await _repo.SaveChangesAsync()) return NoContent();
            return BadRequest("failed to update");
        }
        [HttpPost("add-photo")]
        public async Task<ActionResult<photoDto>> addPhoto(IFormFile file)
        {
            var user = await _repo.GetUserByUserNameAsync(User.getuser());
            var Result = await _photo.AddPhotoAsync(file);
            if (Result.Error != null) return BadRequest(Result.Error.Message);
            var photo = new photo
            {
                Url = Result.SecureUrl.AbsoluteUri,
                PublicId = Result.PublicId
            };
            if (user.Photos.Count == 0)
            {
                photo.Ismain = true;
            }
            user.Photos.Add(photo);
            if (await _repo.SaveChangesAsync())
            {
                return CreatedAtRoute("GetUser",new { username = user.UserName}, _mapper.Map<photoDto>(photo));
                //return _mapper.Map<photoDto>(photo);
            }
            return BadRequest("photo is not uploaded");
        }
        [HttpPut("set-main/{photoId}")]
        public async Task<ActionResult> setMain(int photoId)
        {
            var user = await _repo.GetUserByUserNameAsync(User.getuser());
            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo.Ismain) return BadRequest("this your main photo");
            var current = user.Photos.FirstOrDefault(x => x.Ismain == true);
            current.Ismain = false;
            photo.Ismain = true;
            if (await _repo.SaveChangesAsync()) return NoContent();
            return BadRequest("failed to set the photo");
        }
        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> deletephoto(int photoId)
        {
            var user = await _repo.GetUserByUserNameAsync(User.getuser());
            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo == null) return NotFound();
            if (photo.Ismain) return BadRequest("this main photo");
            if(photo.PublicId != null)
            {
                var result = await _photo.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }
            user.Photos.Remove(photo);
            if (await _repo.SaveChangesAsync()) return Ok();
            return BadRequest("problem while deleting");
        }
    }
}
