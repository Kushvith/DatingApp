using Dating.DTOs;
using Dating.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dating.Interfsces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveChangesAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByUserNameAsync(string username);
        Task<MemberDtos> getMember(string username);
        Task<IEnumerable<MemberDtos>> getMembers();
    }
}
