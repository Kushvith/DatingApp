using AutoMapper;
using AutoMapper.QueryableExtensions;
using Dating.DTOs;
using Dating.Interfsces;
using Dating.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dating.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly Datacontext _context;
        private readonly IMapper _mapper;

        public UserRepository(Datacontext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MemberDtos> getMember(string username)
        {
            return await _context.Users.Where(x => x.UserName == username).ProjectTo<MemberDtos>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDtos>> getMembers()
        {
            return await _context.Users.ProjectTo<MemberDtos>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<AppUser> GetUserByUserNameAsync(string username)
        {
            return await _context.Users.Include(x => x.Photos).SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
